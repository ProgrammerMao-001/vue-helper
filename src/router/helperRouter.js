export default new Router({
  routers: [
    /**
     * 接口
     * */
    // start
    {
      "entity": null,
      "code": 200,
      "childs": [
        {
          "entity": {
            "id": 1,
            "parentMenuId": 0,
            "name": "系统管理",
            "icon": "el-icon-message\r\n",
            "alias": "系统管理",
            "state": "ENABLE",
            "sort": 0,
            "path": "/system",
            "type": "NONE",
            "createUserId": 1
          },
          "childs": [
            {
              "entity": {
                "id": 3,
                "parentMenuId": 1,
                "name": "权限管理",
                "icon": "el-icon-user",
                "alias": "权限管理",
                "state": "ENABLE",
                "sort": 0,
                "path": "/system/auth",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
            {
              "entity": {
                "id": 4,
                "parentMenuId": 1,
                "name": "角色管理",
                "icon": "el-icon-bell",
                "alias": "角色管理",
                "state": "ENABLE",
                "sort": 1,
                "path": "/system/role",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
            {
              "entity": {
                "id": 2,
                "parentMenuId": 1,
                "name": "菜单管理",
                "icon": "el-icon-edit",
                "alias": "菜单管理",
                "state": "ENABLE",
                "sort": 2,
                "path": "/system/menu",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
            {
              "entity": {
                "id": 5,
                "parentMenuId": 1,
                "name": "分组管理",
                "icon": "el-icon-mobile-phone\r\n",
                "alias": "分组管理",
                "state": "ENABLE",
                "sort": 3,
                "path": "/system/group",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            }
          ]
        },
        {
          "entity": {
            "id": 6,
            "parentMenuId": 0,
            "name": "用户管理",
            "icon": "el-icon-news",
            "alias": "用户管理",
            "state": "ENABLE",
            "sort": 1,
            "path": "/user/content/email",
            "type": "NONE",
            "createUserId": 1
          },
          "childs": [{
            "entity": {
              "id": 7,
              "parentMenuId": 6,
              "name": "帐号管理",
              "icon": "el-icon-phone-outline\r\n",
              "alias": "帐号管理",
              "state": "ENABLE",
              "sort": 0,
              "path": "/user/content/email",
              "type": "NONE",
              "createUserId": 1
            },
            "childs": [{
              "entity": {
                "id": 14,
                "parentMenuId": 7,
                "name": "邮箱管理",
                "icon": "el-icon-sold-out\r\n",
                "alias": "邮箱管理",
                "state": "ENABLE",
                "sort": 0,
                "path": "/user/content/email",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
              {
                "entity": {
                  "id": 13,
                  "parentMenuId": 7,
                  "name": "密码管理",
                  "icon": "el-icon-service\r\n",
                  "alias": "密码管理",
                  "state": "ENABLE",
                  "sort": 1,
                  "path": "/user/content/pass",
                  "type": "LINK",
                  "createUserId": 1
                },
                "childs": null
              }
            ]
          },
            {
              "entity": {
                "id": 8,
                "parentMenuId": 6,
                "name": "积分管理",
                "icon": "el-icon-picture",
                "alias": "积分管理",
                "state": "ENABLE",
                "sort": 1,
                "path": "/user/integral",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            }
          ]
        },
        {
          "entity": {
            "id": 9,
            "parentMenuId": 0,
            "name": "内容管理",
            "icon": "el-icon-rank",
            "alias": "内容管理",
            "state": "ENABLE",
            "sort": 2,
            "path": "/content",
            "type": "NONE",
            "createUserId": 1
          },
          "childs": [{
            "entity": {
              "id": 10,
              "parentMenuId": 9,
              "name": "分类管理",
              "icon": "el-icon-printer",
              "alias": "分类管理",
              "state": "ENABLE",
              "sort": 0,
              "path": "/content/classify",
              "type": "LINK",
              "createUserId": 1
            },
            "childs": null
          },
            {
              "entity": {
                "id": 11,
                "parentMenuId": 9,
                "name": "文章管理",
                "icon": "el-icon-star-on",
                "alias": "文章管理",
                "state": "ENABLE",
                "sort": 1,
                "path": "/content/article",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
            {
              "entity": {
                "id": 12,
                "parentMenuId": 9,
                "name": "评论管理",
                "icon": "el-icon-share",
                "alias": "评论管理",
                "state": "ENABLE",
                "sort": 2,
                "path": "/content/comment",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            }
          ]
        },

        {
          "entity": {
            "id": 16,
            "parentMenuId": 0,
            "name": "预警管理",
            "icon": "el-icon-message-solid",
            "alias": "预警管理",
            "state": "ENABLE",
            "sort": 1,
            "path": "/earlyWarning/monitor",
            "type": "NONE",
            "createUserId": 1
          },
          "childs": [{
            "entity": {
              "id": 17,
              "parentMenuId": 16,
              "name": "监控管理",
              "icon": "el-icon-video-camera-solid",
              "alias": "监控管理",
              "state": "ENABLE",
              "sort": 10,
              "path": "/earlyWarning/monitor",
              "type": "NONE",
              "createUserId": 11
            },
            "childs": null
          },
            {
              "entity": {
                "id": 18,
                "parentMenuId": 16,
                "name": "订单管理",
                "icon": "el-icon-s-order",
                "alias": "订单管理",
                "state": "ENABLE",
                "sort": 18,
                "path": "/earlyWarning/order/commodity",
                "type": "LINK",
                "createUserId": 11
              },
              "childs": [{
                "entity": {
                  "id": 114,
                  "parentMenuId": 16,
                  "name": "商品管理",
                  "icon": "el-icon-s-data",
                  "alias": "商品管理",
                  "state": "ENABLE",
                  "sort": 10,
                  "path": "/earlyWarning/order/commodity",
                  "type": "LINK",
                  "createUserId": 11
                },
                "childs": null
              },
                {
                  "entity": {
                    "id": 113,
                    "parentMenuId": 16,
                    "name": "人物管理",
                    "icon": "el-icon-s-custom",
                    "alias": "人物管理",
                    "state": "ENABLE",
                    "sort": 11,
                    "path": "/earlyWarning/order/people",
                    "type": "LINK",
                    "createUserId": 11
                  },
                  "childs": null
                }
              ]
            }
          ]
        },

        {
          "entity": {
            "id": 161,
            "parentMenuId": 0,
            "name": "高德地图",
            "icon": "el-icon-location-outline",
            "alias": "高德地图",
            "state": "ENABLE",
            "sort": 0,
            "path": "/gaoDeMap",
            "type": "NONE",
            "createUserId": 1
          },
          "childs": [
            {
              "entity": {
                "id": 162,
                "parentMenuId": 0,
                "name": "随机定位",
                "icon": "el-icon-place",
                "alias": "随机定位",
                "state": "ENABLE",
                "sort": 0,
                "path": "/gaoDeMap/randomPositioning",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
            {
              "entity": {
                "id": 163,
                "parentMenuId": 0,
                "name": "VueAMap模板",
                "icon": "el-icon-place",
                "alias": "VueAMap模板",
                "state": "ENABLE",
                "sort": 0,
                "path": "/gaoDeMap/vueAMapTemplate",
                "type": "LINK",
                "createUserId": 1
              },
              "childs": null
            },
          ]
        },


      ]
    }
    // end
  ]
})
