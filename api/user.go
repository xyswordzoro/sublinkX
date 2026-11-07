package api

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"sublink/models"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID       int
	Username string
	Nickname string
	Avatar   string
	Mobile   string
	Email    string
}

// 新增用户
func UserAdd(c *gin.Context) {
	user := &models.User{
		Username: "test",
		Password: "test",
	}
	err := user.Create()
	if err != nil {
		log.Println("创建用户失败")
	}
	c.String(200, "创建用户成功")
}

// 获取用户信息
func UserMe(c *gin.Context) {
	// 获取jwt中的username
	// 返回用户信息
	username, _ := c.Get("username")
	user := &models.User{Username: username.(string)}
	err := user.Find()
	if err != nil {
		c.JSON(400, gin.H{
			"code": "00000",
			"msg":  err,
		})
		return
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": gin.H{
			"avatar":   user.Avatar,
			"nickname": user.Nickname,
			"userId":   user.ID,
			"username": user.Username,
			"roles":    []string{"ADMIN"},
		},
		"msg": "获取用户信息成功",
	})
}

// UserAvatar 上传用户头像
func UserAvatar(c *gin.Context) {
	username, _ := c.Get("username")
	user := &models.User{Username: username.(string)}
	if err := user.Find(); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "用户不存在"})
		return
	}
	file, err := c.FormFile("avatar")
	if err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "未收到头像文件"})
		return
	}
	// 大小限制 2MB
	if file.Size > 2*1024*1024 {
		c.JSON(400, gin.H{"code": "00001", "msg": "头像不能超过 2MB"})
		return
	}
	// 类型限制
	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowed := map[string]bool{".png": true, ".jpg": true, ".jpeg": true, ".webp": true, ".gif": true}
	if !allowed[ext] {
		c.JSON(400, gin.H{"code": "00001", "msg": "仅支持 png / jpg / webp / gif 格式"})
		return
	}
	// 保存到 ./db/avatars/<用户名>_<时间戳><ext>
	dir := "./db/avatars"
	if err := os.MkdirAll(dir, 0755); err != nil {
		c.JSON(500, gin.H{"code": "00001", "msg": "创建头像目录失败"})
		return
	}
	filename := fmt.Sprintf("%s_%d%s", username.(string), time.Now().UnixNano()/int64(time.Millisecond), ext)
	savePath := filepath.Join(dir, filename)
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		log.Println("保存头像失败:", err)
		c.JSON(500, gin.H{"code": "00001", "msg": "保存头像失败"})
		return
	}
	avatarURL := "/avatars/" + filename
	// 删除旧头像文件
	if user.Avatar != "" {
		old := filepath.Join(dir, filepath.Base(user.Avatar))
		_ = os.Remove(old)
	}
	if err := models.DB.Model(user).Where("id = ?", user.ID).Update("avatar", avatarURL).Error; err != nil {
		c.JSON(500, gin.H{"code": "00001", "msg": "更新头像失败"})
		return
	}
	models.OpLogAdd("面板", "更新头像", username.(string))
	c.JSON(200, gin.H{
		"code": "00000",
		"data": gin.H{"avatar": avatarURL},
		"msg":  "头像已更新",
	})
}

// 获取所有用户
func UserPages(c *gin.Context) {
	// 获取jwt中的username
	// 返回用户信息
	username, _ := c.Get("username")
	user := &models.User{Username: username.(string)}
	users, err := user.All()
	if err != nil {
		log.Println("获取用户信息失败")
	}
	list := []*User{}
	for i := range users {
		list = append(list, &User{
			ID:       users[i].ID,
			Username: users[i].Username,
			Nickname: users[i].Nickname,
			Avatar:   users[i].Avatar,
		})
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": gin.H{
			"list": list,
		},
		"msg": "获取用户信息成功",
	})
}

// 更新用户信息

func UserSet(c *gin.Context) {
	NewUsername := c.PostForm("username")
	NewPassword := c.PostForm("password")
	log.Println(NewUsername, NewPassword)
	if NewUsername == "" || NewPassword == "" {
		c.JSON(400, gin.H{
			"code": "00001",
			"msg":  "用户名或密码不能为空",
		})
		return
	}
	username, _ := c.Get("username")
	user := &models.User{Username: username.(string)}
	err := user.Set(&models.User{
		Username: NewUsername,
		Password: NewPassword,
	})
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"code": "00000",
			"msg":  err,
		})
		return
	}
	// 修改成功
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "修改成功",
	})

}
