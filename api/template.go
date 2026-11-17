package api

import (
	"log"
	"os"

	"sublink/models"
	"sublink/tpl"

	"github.com/gin-gonic/gin"
)

type Temp = tpl.Temp

// 定义允许操作的基础目录

// safeFilePath 转发到 tpl 包的安全路径校验（模板引擎已迁移至 sublink/tpl）
func safeFilePath(filename string) (string, error) {
	return tpl.SafeFilePath(filename)
}

func GetTempS(c *gin.Context) {
	temps := tpl.ListFiles()
	if temps == nil {
		temps = []tpl.Temp{}
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": temps,
		"msg":  "ok",
	})
}
func UpdateTemp(c *gin.Context) {
	filename := c.PostForm("filename")
	oldname := c.PostForm("oldname")
	text := c.PostForm("text")

	if filename == "" || oldname == "" || text == "" {
		c.JSON(400, gin.H{
			"msg": "文件名或内容不能为空",
		})
		return
	}

	// 验证旧文件名以防止目录遍历
	oldFullPath, err := safeFilePath(oldname)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": "旧文件名非法: " + err.Error(),
		})
		return
	}

	// 验证新文件名以防止目录遍历
	newFullPath, err := safeFilePath(filename)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": "新文件名非法: " + err.Error(),
		})
		return
	}

	// 检查旧文件是否存在
	if _, err := os.Stat(oldFullPath); os.IsNotExist(err) {
		c.JSON(400, gin.H{
			"msg": "旧文件不存在",
		})
		return
	} else if err != nil {
		log.Println("检查旧文件存在性失败:", err)
		c.JSON(500, gin.H{
			"msg": "服务器错误：检查旧文件失败",
		})
		return
	}

	// 如果新旧文件名不同，则检查新文件是否已存在
	if oldFullPath != newFullPath {
		if _, err := os.Stat(newFullPath); err == nil {
			c.JSON(400, gin.H{
				"msg": "新文件名已存在，请选择其他名称",
			})
			return
		} else if !os.IsNotExist(err) {
			log.Println("检查新文件存在性失败:", err)
			c.JSON(500, gin.H{
				"msg": "服务器错误：检查新文件失败",
			})
			return
		}
	}

	// 如果文件名不同，则进行重命名操作
	if oldFullPath != newFullPath {
		err = os.Rename(oldFullPath, newFullPath)
		if err != nil {
			log.Println("文件改名失败:", err)
			c.JSON(500, gin.H{
				"msg": "改名失败",
			})
			return
		}
	}

	// 写入文件内容到新的安全路径
	err = os.WriteFile(newFullPath, []byte(text), 0666) // 确保写入到新的安全路径
	if err != nil {
		log.Println("修改文件内容失败:", err)
		c.JSON(500, gin.H{
			"msg": "修改失败",
		})
		return
	}
	models.OpLogAdd("面板", "修改模板", filename)

	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "修改成功",
	})
}
func AddTemp(c *gin.Context) {
	filename := c.PostForm("filename")
	text := c.PostForm("text")

	if filename == "" || text == "" {
		c.JSON(400, gin.H{
			"msg": "文件名或内容不能为空",
		})
		return
	}

	// tpl 包 init 已确保模板目录存在，此处无需重复创建

	// 获取安全的文件路径
	fullPath, err := safeFilePath(filename)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": "文件名非法: " + err.Error(),
		})
		return
	}

	// 检查文件是否已存在
	if _, err := os.Stat(fullPath); err == nil {
		c.JSON(400, gin.H{
			"msg": "文件已存在",
		})
		return
	} else if !os.IsNotExist(err) {
		// 除了文件不存在的错误，其他都是内部错误
		log.Println("检查文件存在性失败:", err)
		c.JSON(500, gin.H{
			"msg": "服务器错误：检查文件失败",
		})
		return
	}

	// 写入文件
	err = os.WriteFile(fullPath, []byte(text), 0666)
	if err != nil {
		log.Println("写入文件失败:", err)
		c.JSON(500, gin.H{
			"msg": "上传失败",
		})
		return
	}
	models.OpLogAdd("面板", "新建模板", filename)

	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "上传成功",
	})
}

func DelTemp(c *gin.Context) {
	filename := c.PostForm("filename")

	if filename == "" {
		c.JSON(400, gin.H{
			"msg": "文件名不能为空",
		})
		return
	}

	// 获取安全的文件路径
	fullPath, err := safeFilePath(filename)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": "文件名非法: " + err.Error(),
		})
		return
	}

	// 检查文件是否存在
	if _, err := os.Stat(fullPath); os.IsNotExist(err) {
		c.JSON(400, gin.H{
			"msg": "文件不存在",
		})
		return
	} else if err != nil {
		log.Println("检查文件存在性失败:", err)
		c.JSON(500, gin.H{
			"msg": "服务器错误：检查文件失败",
		})
		return
	}

	// 删除文件
	err = os.Remove(fullPath)
	if err != nil {
		log.Println("删除文件失败:", err)
		c.JSON(500, gin.H{
			"msg": "删除失败",
		})
		return
	}
	models.OpLogAdd("面板", "删除模板", filename)

	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "删除成功",
	})
}
