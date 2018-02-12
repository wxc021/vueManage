import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import mainIndex from '@/pages/index'
const pop = () => import('@/components/pop/countMore.vue')
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login.vue'], resolve)
    },
  	//首页
    {
      path: '/index',
      name: 'mainIndex',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/index.vue'], resolve),
    },
    //org router
    {
      path: '/orgManage/:ids',
      name: 'orgManage',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/orgManage/org.vue'], resolve),
      children: [
      {
        path: 'group/:id',
        name: 'group',
        component: resolve => require(['@/components/infoDetail/group.vue'], resolve),
      },
      {
        path: 'info/:id/:switchs',
        name: 'info',
        component: resolve => require(['@/components/infoDetail/info.vue'], resolve),
        children:[
        {
            path: 'TeamMember',
            name: 'TeamMember',
            component: resolve => require(['@/components/pop/TeamMember.vue'], resolve),
        },
        //新增奖惩
        {
            path: 'RewardPunishment',
            name: 'RewardPunishment',
            meta: {
              requireAuth: true,
            },
            component: resolve => require(['@/components/pop/RewardPunishment.vue'], resolve),
        },
        //党组织管理/新增单位信息
        {path: 'UnitAdd',
           name: 'UnitAdd',
           meta: {
             requireAuth: true,
           },
           component: resolve => require(['@/components/pop/UnitAdd.vue'], resolve),
         },
        //新增支部评议
        {
          path: 'DemocraticReview',
          name: 'DemocraticReview',
          meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/DemocraticReview.vue'], resolve),
        },
        //联系方式党组联系人
        {
            path: 'Contacts',
            name: 'Contacts',
            meta: {
              requireAuth: true,
            },
            component: resolve => require(['@/components/pop/adminConfig/addadmin.vue'], resolve),
        },
        ]
      },
      {//党组织整建制转移
        path: 'InsideTransfer/:id',
        name: 'InsideTransfer',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/InsideTransfer.vue'], resolve),
      },
      {//党组织增加
        path: 'AddOrganization',
        name: 'AddOrganization',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/AddOrganization.vue'], resolve),
      },

      {//党支部合并
        path: 'PartyMerge/:id',
        name: 'PartyMerge',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyMerge.vue'], resolve),
      },
      {//党支部拆分
        path: 'PartySplit/:id',
        name: 'PartySplit',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartySplit.vue'], resolve),
      },
      {//党支部撤销弹窗路由
        path: 'PartyRevoke',
        name: 'PartyRevoke',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyRevoke.vue'], resolve),
      },
      {//设置党小组弹窗路由
        path: 'PartyTeam/:id',
        name: 'PartyTeam',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyTeam.vue'], resolve),
      },
      {//党组织管理/批量修改弹窗路由
        path: 'BatchUpdate',
        name: 'BatchUpdate',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/BatchUpdate.vue'], resolve),
      },
      {//组合查询弹窗路由
        path: 'CombinationQuery',
        name: 'CombinationQuery',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/CombinationQuery.vue'], resolve),
      },

      ],
    },
    //baseSituation router
    {
      path: '/baseSituation',
      name: 'baseSituation',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/baseSituation/baseSituation.vue'], resolve),
    },
    {
      path: '/custom/:id',
      name: 'custom',
      meta: {
          requireAuth: true,
      },
      components: {
        default: () => import('@/pages/custom/custom.vue'),
      },
			children:[
		  {
			  path:'addCustom',
		    name:'addCustom',
			  component:resolve=>require(['@/components/custom/addCustom.vue'],resolve)
		  }
			]
    },
    // count from router
    {
      path: '/countForm',
      name: 'countForm',
      meta: {
          requireAuth: true,
      },
      components: {
        default: () => import('@/pages/countForm/countForm.vue'),
      },
      //component: resolve => require(['@/pages/countForm/countForm.vue'], resolve),
      children: [
        {
          path: 'covers/form-custom',
          name: 'form-custom',
          component: resolve => require(['@/components/customtable/tables'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-10',
          name: 'form-10',
          component: resolve => require(['@/components/tables/tables10.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-11',
          name: 'form-11',
          component: resolve => require(['@/components/tables/tables11.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-13',
          name: 'form-13',
          component: resolve => require(['@/components/tables/tables13.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-5',
          name: 'form-5',
          component: resolve => require(['@/components/tables/tables5.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-6',
          name: 'form-6',
          component: resolve => require(['@/components/tables/tables6.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-9',
          name: 'form-9',
          component: resolve => require(['@/components/tables/tables9.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-15',
          name: 'form-15',
          component: resolve => require(['@/components/tables/tables15.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-16',
          name: 'form-16',
          component: resolve => require(['@/components/tables/tables16.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-30',
          name: 'form-30',
          component: resolve => require(['@/components/tables/tables30.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-31',
          name: 'form-31',
          component: resolve => require(['@/components/tables/tables31.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-32',
          name: 'form-32',
          component: resolve => require(['@/components/tables/tables32.vue'], resolve),
          children: [
            {
             path: 'countMore/:id',
             name: 'countMore',
             component:  pop
           }
           ]
         },
				 {
					 path: 'covers/form-17',
					 name: 'form-17',
					 component: resolve => require(['@/components/tables/tables17.vue'], resolve),
					 children: [
						 {
							 path: 'countMore/:id',
							 name: 'countMore',
							 component:  pop
					   }
				   ]
				 },
				 {
				   path: 'covers/form-18',
					 name: 'form-18',
					 component: resolve => require(['@/components/tables/tables18.vue'], resolve),
					 children: [
						 {
							 path: 'countMore/:id',
							 name: 'countMore',
							 component:  pop
						 }
					 ]
				 },
         {
           path: 'covers/form-19',
           name: 'form-19',
           component: resolve => require(['@/components/tables/tables19.vue'], resolve),
           children: [
             {
               path: 'countMore/:id',
               name: 'countMore',
               component:  pop
             }
           ]
         },
         {
          path: 'covers/form-20',
          name: 'form-20',
          component: resolve => require(['@/components/tables/tables20.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
         },
         {
          path: 'covers/form-21',
          name: 'form-21',
          component: resolve => require(['@/components/tables/tables21.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
         },
         {
          path: 'covers/form-25',
          name: 'form-25',
          component: resolve => require(['@/components/tables/tables25.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
         },
         {
          path: 'covers/form-26',
          name: 'form-26',
          component: resolve => require(['@/components/tables/tables26.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
         },
         {
          path: 'covers/form-27',
          name: 'form-27',
          component: resolve => require(['@/components/tables/tables27.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
         },
         {
          path: 'covers/form-33',
          name: 'form-33',
          component: resolve => require(['@/components/tables/tables33.vue'], resolve),
          children: [
            {
             path: 'countMore/:id',
             name: 'countMore',
             component:  pop
           }
           ]
         },
         {
          path: 'covers/form-35',
          name: 'form-35',
          component: resolve => require(['@/components/tables/tables35.vue'], resolve),
          children: [
            {
             path: 'countMore/:id',
             name: 'countMore',
             component:  pop
           }
           ]
         },
				{
					path: 'covers/form-14',
					name: 'form-14',
					component: resolve => require(['@/components/tables/tables14.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-12',
					name: 'form-12',
					component: resolve => require(['@/components/tables/tables12.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
        {
          path: 'covers/form-34',
          name: 'form-34',
          component: resolve => require(['@/components/tables/tables34.vue'], resolve),
          children: [
            {
             path: 'countMore/:id',
             name: 'countMore',
             component:  pop
           }
           ]
         },
				{
					path: 'covers/form-37',
					name: 'form-37',
					component: resolve => require(['@/components/tables/tables37.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-2',
					name: 'form-2',
					component: resolve => require(['@/components/tables/tables2.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-22',
					name: 'form-22',
					component: resolve => require(['@/components/tables/tables22.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
        {
          path: 'covers/form-45',
          name: 'form-45',
          component: resolve => require(['@/components/tables/tables45.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-47',
          name: 'form-47',
          component: resolve => require(['@/components/tables/tables47.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
        {
          path: 'covers/form-49',
          name: 'form-49',
          component: resolve => require(['@/components/tables/tables49.vue'], resolve),
          children: [
            {
              path: 'countMore/:id',
              name: 'countMore',
              component:  pop
            }
          ]
        },
				{
					path: 'covers/form-28',
					name: 'form-28',
					component: resolve => require(['@/components/tables/tables28.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-36',
					name: 'form-36',
					component: resolve => require(['@/components/tables/tables36.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-38',
					name: 'form-38',
					component: resolve => require(['@/components/tables/tables38.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-39',
					name: 'form-39',
					component: resolve => require(['@/components/tables/tables39.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-40',
					name: 'form-40',
					component: resolve => require(['@/components/tables/tables40.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-41',
					name: 'form-41',
					component: resolve => require(['@/components/tables/tables41.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-42',
					name: 'form-42',
					component: resolve => require(['@/components/tables/tables42.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-43',
					name: 'form-43',
					component: resolve => require(['@/components/tables/tables43.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-44',
					name: 'form-44',
					component: resolve => require(['@/components/tables/tables44.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-46',
					name: 'form-46',
					component: resolve => require(['@/components/tables/tables46.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
				{
					path: 'covers/form-48',
					name: 'form-48',
					component: resolve => require(['@/components/tables/tables48.vue'], resolve),
					children: [
						{
							path: 'countMore/:id',
							name: 'countMore',
							component:  pop
						}
					]
				},
			  {
			    path: 'covers/form-50',
			    name: 'form-50',
				  component: resolve => require(['@/components/tables/tables50.vue'], resolve),
				  children: [
				    {
				      path: 'countMore/:id',
				      name: 'countMore',
				      component:  pop
				    }
				  ]
				 },
				 {
					  path: 'covers/form-51',
					  name: 'form-51',
					  component: resolve => require(['@/components/tables/tables51.vue'], resolve),
					  children: [
					    {
					      path: 'countMore/:id',
					      name: 'countMore',
					      component:  pop
					    }
					  ]
					 },
				 //{
					//	path: 'covers/form-3',
					//	name: 'form-3',
					//	component: resolve => require(['@/components/tables/tables3.vue'], resolve),
					//	children: [
					//		{
					//			path: 'countMore/:id',
					//			name: 'countMore',
					//			component: pop
					//		}
					//	]
				 //},

        // {
        //   path: 'covers/form-26',
        //   name: 'form-26',
        //   component: resolve => require(['@/components/tables/tables26.vue'], resolve),
        //   children: [
        //     {
        //       path: 'countMore/:id',
        //       name: 'countMore',
        //       component:  pop
        //     }
        //   ]
        // },
      ]
    },
    {
      path: '/sysManage',
      name: 'sysManage',
      meta: {
      requireAuth: true,
      },
      component: resolve => require(['@/pages/sysytemManage/sysManage.vue'], resolve),
      children:[
        {
          path: 'addManage',
          name: 'addManage',
          component: resolve => require(['@/components/pop/system/addManage.vue'], resolve),
        },
      ]
    },
    //unit manage router
    {
      path: '/unitManage',
      name: 'unitManage',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/unitManage/unitManage.vue'], resolve),
      children: [
        {
          path: 'unit/:id',
          name: 'unit',
          component: resolve => require(['@/components/infoDetail/unit.vue'], resolve),
        },
        {
          path: 'unitAdd',
          name: 'unitAdd',
          component: resolve => require(['@/components/infoDetail/unit.vue'], resolve),
        },
        {
          path: 'UnitTransfer',
          name: 'UnitTransfer',
          component: resolve => require(['@/components/pop/unit/UnitTransfer.vue'], resolve),
        },
        {
          path: 'UnitSort',
          name: 'UnitSort',
          component: resolve => require(['@/components/pop/unit/UnitSort.vue'], resolve),
        },
        {
          path: 'UnitTeacher',
          name: 'UnitTeacher',
          component: resolve => require(['@/components/pop/unit/UnitTeacher.vue'], resolve),
        },
        {//单位组合查询弹窗路由
          path: 'UnitQuery',
          name: 'UnitQuery',
          meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/unit/CombinationQuery.vue'], resolve),
        },

      ]
    },
    {
      path: '/interview',
      name: 'interview',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/components/interview/interview.vue'], resolve),
      children: [
        {
          path: 'interviewpop/:id',
          name: 'interviewpop',
          component: resolve => require(['@/components/pop/reviewpop.vue'], resolve),
        },
        {
          path: 'interviewnext',
          name: 'interviewnext',
          component: resolve => require(['@/components/pop/org/partyLetter.vue'], resolve),
        },
      ]
    },
    {
      path: '/checkForm/:id/:type',
      name: 'checkForm',
      meta: {
        requireAuth: true,
      },
      component: resolve => require(['@/pages/countForm/checkForm.vue'], resolve),
      children:[
        // {
        //   path: 'info/:uid',
        //   name: 'membercheckinfo',
        //   children: [
        //     {
        //       path: ':tab'
        //     }
        //   ]
        // },


        {
            path: 'TeamMember',
            name: 'checkTeamMember',
            component: resolve => require(['@/components/pop/TeamMember.vue'], resolve),
        },
        //新增奖惩
        {
            path: 'RewardPunishment',
            name: 'checkRewardPunishment',
            meta: {
              requireAuth: true,
            },
            component: resolve => require(['@/components/pop/RewardPunishment.vue'], resolve),
        },
        //党组织管理/新增单位信息
        {path: 'UnitAdd',
           name: 'checkUnitAdd',
           meta: {
             requireAuth: true,
           },
           component: resolve => require(['@/components/pop/UnitAdd.vue'], resolve),
         },
        //新增支部评议
        {
          path: 'DemocraticReview',
          name: 'checkDemocraticReview',
          meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/DemocraticReview.vue'], resolve),
        },

        {
          path: 'unit/:id',
          name: 'unit',
          component: resolve => require(['@/components/infoDetail/unit.vue'], resolve),
        },
        {
          path: 'unitAdd',
          name: 'unitAdd',
          component: resolve => require(['@/components/infoDetail/unit.vue'], resolve),
        },
        {
          path: 'UnitTransfer',
          name: 'UnitTransfer',
          component: resolve => require(['@/components/pop/unit/UnitTransfer.vue'], resolve),
        },
        {
          path: 'UnitSort',
          name: 'UnitSort',
          component: resolve => require(['@/components/pop/unit/UnitSort.vue'], resolve),
        },
        {
          path: 'UnitTeacher',
          name: 'UnitTeacher',
          component: resolve => require(['@/components/pop/unit/UnitTeacher.vue'], resolve),
        },
        {//单位组合查询弹窗路由
          path: 'UnitQuery',
          name: 'UnitQuery',
          meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/CombinationQuery.vue'], resolve),
        },


        ]
    },
    //infocheck router
    {
      path: '/infoCheck/:ids',
      name: 'infoCheck',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/components/infoCheck.vue'], resolve),
      children: [
      {
        path: 'group/:id',
        name: 'group',
        component: resolve => require(['@/components/infoDetail/group.vue'], resolve),
      },
      {
        path: 'info/:id/:switchs',
        name: 'checkinfo',
        component: resolve => require(['@/components/infoDetail/info.vue'], resolve),
        children:[
        {
            path: 'TeamMember',
            name: 'checkTeamMember',
            component: resolve => require(['@/components/pop/TeamMember.vue'], resolve),
        },
        //新增奖惩
        {
            path: 'RewardPunishment',
            name: 'checkRewardPunishment',
            meta: {
              requireAuth: true,
            },
            component: resolve => require(['@/components/pop/RewardPunishment.vue'], resolve),
        },
        //党组织管理/新增单位信息
        {path: 'UnitAdd',
           name: 'checkUnitAdd',
           meta: {
             requireAuth: true,
           },
           component: resolve => require(['@/components/pop/UnitAdd.vue'], resolve),
         },
        //新增支部评议
        {
          path: 'DemocraticReview',
          name: 'checkDemocraticReview',
          meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/DemocraticReview.vue'], resolve),
        },
        ]
      },
      {//党组织整建制转移
        path: 'InsideTransfer',
        name: 'checkInsideTransfer',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/InsideTransfer.vue'], resolve),
      },
      {//党组织增加
        path: 'AddOrganization',
        name: 'checkAddOrganization',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/AddOrganization.vue'], resolve),
      },

      {//党支部合并
        path: 'PartyMerge',
        name: 'checkPartyMerge',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyMerge.vue'], resolve),
      },
      {//党支部拆分
        path: 'PartySplit',
        name: 'checkPartySplit',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartySplit.vue'], resolve),
      },
      {//党支部撤销弹窗路由
        path: 'PartyRevoke',
        name: 'checkPartyRevoke',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyRevoke.vue'], resolve),
      },
      {//设置党小组弹窗路由
        path: 'PartyTeam',
        name: 'checkPartyTeam',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/PartyTeam.vue'], resolve),
      },
      {//党组织管理/批量修改弹窗路由
        path: 'BatchUpdate',
        name: 'checkBatchUpdate',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['@/components/pop/BatchUpdate.vue'], resolve),
      },


      ],
    },

    // 党员信息校核
    {
      path: '/membercheck/:dept',
      name: 'membercheck',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/components/membercheck.vue'], resolve),
      children:[
        {
          path: 'info/:uid',
          name: 'membercheckinfo',
          children: [
            {
              path: ':tab'
            }
          ]
        }
      ]
    },
    // 申请人信息校核
    {
      path: '/applicantcheck/:dept',
      name: 'applicantcheck',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/components/applicantcheck.vue'], resolve),
      children:[
        {
          path: 'info/:uid',
          name: 'applicantcheckinfo',
          children: [
            {
              path: ':tab'
            }
          ]
        }
      ]
    },

    //组织关系转接
    {
      path: '/organizationManage',
      name: 'organizationManage',
      component: resolve => require(['@/pages/organizationManage/organizationManage.vue'], resolve),
      children:[
        {
          path: 'partyOut',
          name: 'partyOut',
          component: resolve => require(['@/components/pop/org/partyOut.vue'], resolve),
        },
        {
          path:'partyOutStep2',
          name:'partyOutStep2',
          component: resolve => require(['@/components/pop/org/partyOutStep2.vue'], resolve),
        },
        {
          path:'partyTree',
          name:'partyTree',
          component: resolve => require(['@/components/pop/org/partyTree.vue'], resolve),
        },
        {
          path:'partyLetter',
          // name:'partyLetter',
          component: resolve => require(['@/components/pop/org/partyLetter.vue'], resolve),
        },
      ],
    },
    {
      path: '/organizationManage/:dept',
      name: 'organizationManageList',
      meta: {
        requireAuth: true,
      },
      component: resolve => require(['@/pages/organizationManage/organizationManage.vue'], resolve),
      children: [
        {
          path: 'organization/:id',
          name: 'organization',
          component: resolve => require(['@/components/infoDetail/organization.vue'], resolve),
          children:[
            {
              path:'partyReject',
              name:'partyReject',
              component: resolve => require(['@/components/pop/org/partyReject.vue'], resolve),
            }
          ]
        },
        {
          path: 'partyOut',
          name: 'partyOut',
          component: resolve => require(['@/components/pop/org/partyOut.vue'], resolve),
        },
        {
          path:'partyOutStep2',
          name:'partyOutStep2',
          component: resolve => require(['@/components/pop/org/partyOutStep2.vue'], resolve),
        },
        {
          path:'partyTree',
          name:'partyTree',
          component: resolve => require(['@/components/pop/org/partyTree.vue'], resolve),
        },
        {
          path:'partyLetter/:id',
          name:'partyLetter',
          component: resolve => require(['@/components/pop/org/partyLetter.vue'], resolve),
        },
      ]
    },
    //历史党员管理 router
    {
      path: '/historyManage',
      name: 'historyManage',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/historyManage/history.vue'], resolve),
      children:[
      {
        path: ':dept',
        name: 'historylist',
        children: [{
          name: 'historyinfo',
          path: 'info/:uid',
          name: 'historyinfo',
        }]
      },
        // ,{
        //   path: 'modal',
        //   components: {
        //       modal: resolve => require(['@/pages/historyManage/modal.vue'], resolve)
        //   }
        // }
      ]
    },
    //dangyuan router
    {
      path: '/dangyuan',
      name: 'dangyuan',
      meta: {
          requireAuth: true,
      },
      component: resolve => require(['@/pages/dangyuanManage/dangyuan.vue'], resolve),
      children: [
        {
            path: 'modal/add',
            name:'dangyuanadd',
            components: {
                modal: resolve => require(['@/components/pop/partymember/AddPartyMember.vue'], resolve)
            }
        },
    		{
            path: 'modal/dead',
            components: {
                modal: resolve => require(['@/components/pop/partymember/PartyMemberDeath.vue'], resolve)
            }
        },
        {
            path: 'modal/stop',
            components: {
                modal: resolve => require(['@/components/pop/partymember/PartyMemberStop.vue'], resolve)
            }
        },
        {
            path: 'modal/out',
            name:'dangyuanout',
            components: {
                modal: resolve => require(['@/components/pop/partymember/PartyMemberOuter.vue'], resolve)
            }
        },
        {
            path: 'modal/transfer',
            components: {
                modal: resolve => require(['@/components/pop/partymember/PartyMemberZhuanchu.vue'], resolve)
            }
        },
        {
            path: 'modal/sort',
            components: {
                modal: resolve => require(['@/components/pop/partymember/PartyMemberSort.vue'], resolve)
            }
        },
        {
          path: 'modal/distribution',
          components: {
              modal: resolve => require(['@/components/pop/partymember/PartyGroupManage.vue'], resolve)
          }
        },
        {
          path: 'modal/batch',
          components: {
              modal: resolve => require(['@/components/pop/partymember/BatchEdit.vue'], resolve)
          }
        },
        {
          path: 'modal/combos',
          components: {
              modal: resolve => require(['@/components/pop/partymember/CombosQuery.vue'], resolve)
          }
        },
        {
          path: 'modal/batchedit',
          components: {
              modal: resolve => require(['@/components/pop/partymember/BatchEdit.vue'], resolve)
          }
        },
        {
          path: 'modal/batchadd',
          components: {
              modal: resolve => require(['@/components/pop/partymember/BatchAdd.vue'], resolve)
          }
        },
        {//党员组合查询弹窗路由
          path: 'PartyQuery',
            name: 'PartyQuery',
            meta: {
            requireAuth: true,
          },
          component: resolve => require(['@/components/pop/CombinationQuery.vue'], resolve),
        },


        //新增学历 弹窗
        // {
        //   path: 'modal/memberinfo-add',
        //   components: {
        //       modal: resolve => require(['@/components/pop/partymember/memberinfo-education-add.vue'], resolve)
        //   }
        // },
        // {
        //   path: 'modal/post-add',
        //   components: {
        //       modal: resolve => require(['@/components/pop/partymember/memberinfo-post-add.vue'], resolve)
        //   }
        // },
        // {
        //   path: 'modal/admin-add',
        //   components: {
        //       modal: resolve => require(['@/components/pop/partymember/memberinfo-adminjob-add.vue'], resolve)
        //   }
        // },
        // {
        //   path: 'modal/reward-add',
        //   components: {
        //       modal: resolve => require(['@/components/pop/partymember/memberinfo-reward-add.vue'], resolve)
        //   }
        // },
        // {
        //   path: 'modal/representative-add',
        //   components: {
        //       modal: resolve => require(['@/components/pop/partymember/memberinfo-representative-add.vue'], resolve)
        //   }
        // },
      ]
    },
    {
      path: '/dangyuan/:dept',
      name: 'dangyuanlist',
      component: resolve => require(['@/pages/dangyuanManage/dangyuan.vue'], resolve),
      children:[
        {
          path: 'info/:uid',
          name: 'dangyuaninfo',
          children: [
            {
              path: ':tab'
            }
          ]
        }
      ]
    },

    // 申请人管理
    {
      path: '/applicantManage',
      name: 'applicant',
      component: resolve => require(['@/pages/applicantManage/applicantManage.vue'], resolve),
      children:[
        {
          path: 'modal/combos',
          components: {
              modal: resolve => require(['@/components/pop/applicant/CombosQuery.vue'], resolve)
          }
        },
        {
          path: 'modal/add',
          components: {
              modal: resolve => require(['@/components/pop/applicant/AddPartyMember.vue'], resolve)
          }
        },
        {
          path: 'modal/batchedit',
          components: {
              modal: resolve => require(['@/components/pop/applicant/BatchEdit.vue'], resolve)
          }
        },
        {
          path: 'modal/batchadd',
          components: {
              modal: resolve => require(['@/components/pop/applicant/BatchAdd.vue'], resolve)
          }
        },
        {
          path: 'modal/memberinfo-add',
          components: {
              modal: resolve => require(['@/components/pop/applicant/memberinfo-education-add.vue'], resolve)
          }
        },
        {
          path: 'modal/post-add',
          components: {
              modal: resolve => require(['@/components/pop/applicant/memberinfo-post-add.vue'], resolve)
          }
        },
        {
          path: 'modal/admin-add',
          components: {
              modal: resolve => require(['@/components/pop/applicant/memberinfo-adminjob-add.vue'], resolve)
          }
        },
        {
          path: 'modal/reward-add',
          components: {
              modal: resolve => require(['@/components/pop/applicant/memberinfo-reward-add.vue'], resolve)
          }
        },
      ]
    },
    {
      path: '/applicantManage/:dept',
      name: 'applicantlist',
      component: resolve => require(['@/pages/applicantManage/applicantManage.vue'], resolve),
      children:[
      {
          path: 'info/:uid',
          name: 'applicantinfo',
          children: [
            {
              path: ':tab'
            }
          ]
        }
      ]
    },

    // 重复人员查询
    {
      path: '/repeatmembers',
      name: 'repeatmembers',
      component: resolve => require(['@/pages/repeatMembers/repeatMembers.vue'], resolve),
    },
    {
      path: '/repeatmembers/:dept',
      name: 'repeatmemberlist',
      component: resolve => require(['@/pages/repeatMembers/repeatMembers.vue'], resolve),
      children:[{
        path: 'list/:idcard',
        name : 'repeatmembersdetail',
        components: {
          modal: resolve => require(['@/components/pop/repeatmembers/modallist.vue'], resolve)
        }
      }]
    },
	//发展党员审核
	{
	  path:'/recruitExamine',
	  name:'recruitExamine',
	  component:resolve=>require(['@/pages/recruitExamine/recruitMembers.vue'],resolve),
		children:[
			{
				path: 'returnReason',
				name: 'returnReason',
				components: {
					modal: resolve => require(['@/pages/recruitExamine/returnReason.vue'], resolve)
				}
			}
		]
	},
    //发展党员
    {
      path:'/recruitMembers',
      name:'recruitMembers',
      component:resolve=>require(['@/pages/recruitMembers/recruitMembers.vue'],resolve),
      children:[
	    {
		    path: 'allFile',
		    name : 'allFile',
		    components: {
			    modal: resolve => require(['@/components/recruitMembers/affiliatedFile/allFile.vue'], resolve)
		    }
	    },
      {
        path: 'table2/:id',
        name : 'recruitTable2',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/2.vue'], resolve)
        }
      },
      {
        path: 'table3/:id',
        name : 'recruitTable3',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/3.vue'], resolve)
        }
      },
      {
        path: 'table4/:id',
        name : 'recruitTable4',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/4.vue'], resolve)
        }
      },
      {
        path: 'table6/:id',
        name : 'recruitTable6',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/6.vue'], resolve)
        }
      },
      {
        path: 'table6/:id',
        name : 'recruitTable7',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/7.vue'], resolve)
        }
      },
      {
        path: 'table8/:id',
        name : 'recruitTable8',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/8.vue'], resolve)
        }
      },
      {
        path: 'table9/:id',
        name : 'recruitTable9',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/9.vue'], resolve)
        }
      },
      {
        path: 'table11/:id',
        name : 'recruitTable11',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/11.vue'], resolve)
        }
      },
      {
        path: 'table12/:id',
        name : 'recruitTable12',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/12.vue'], resolve)
        }
      },
      {
        path: 'table13/:id',
        name : 'recruitTable13',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/13.vue'], resolve)
        }
      },
      {
        path: 'table14/:id',
        name : 'recruitTable14',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/14.vue'], resolve)
        }
      },
      {
        path: 'table15/:id',
        name : 'recruitTable15',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/15.vue'], resolve)
        }
      },
      {
        path: 'table16/:id',
        name : 'recruitTable16',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/16.vue'], resolve)
        }
      },
      {
        path: 'table19/:id',
        name : 'recruitTable19',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/19.vue'], resolve)
        }
      },
      {
        path: 'table21/:id',
        name : 'recruitTable21',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/21.vue'], resolve)
        }
      },
      {
        path: 'table23/:id',
        name : 'recruitTable23',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/23.vue'], resolve)
        }
      },
      {
        path: 'table25/:id',
        name : 'recruitTable25',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/25.vue'], resolve)
        }
      },
	  {
  		path: 'table27/:id',
	  	name : 'recruitTable27',
	  	components: {
		    modal: resolve => require(['@/components/recruitMembers/onlinetable/27.vue'], resolve)
	  	}
  	  },
      {
        path: 'table29/:id',
        name : 'recruitTable29',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/29.vue'], resolve)
        }
      },
      {
        path: 'table30/:id',
        name : 'recruitTable30',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/30.vue'], resolve)
        }
      },
      {
        path: 'table31/:id',
        name : 'recruitTable31',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/31.vue'], resolve)
        }
      },
      {
        path: 'table32/:id',
        name : 'recruitTable32',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/32.vue'], resolve)
        }
      },
      {
        path: 'table33/:id',
        name : 'recruitTable33',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/33.vue'], resolve)
        }
      },
      {
        path: 'table35/:id',
        name : 'recruitTable35',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/35.vue'], resolve)
        }
      },
      {
        path: 'table36/:id',
        name : 'recruitTable36',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/36.vue'], resolve)
        }
      },
      {
        path: 'table37/:id',
        name : 'recruitTable37',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/37.vue'], resolve)
        }
      },
      {
        path: 'table39/:id',
        name : 'recruitTable39',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/39.vue'], resolve)
        }
      },
      {
        path: 'table40/:id',
        name : 'recruitTable40',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/40.vue'], resolve)
        }
      },
      {
        path: 'table43/:id',
        name : 'recruitTable43',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/43.vue'], resolve)
        }
      },
      {
        path: 'table44/:id',
        name : 'recruitTable44',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/44.vue'], resolve)
        }
      },
      {
        path: 'table46/:id',
        name : 'recruitTable46',
        components: {
          modal: resolve => require(['@/components/recruitMembers/onlinetable/46.vue'], resolve)
        }
      }
    ]
    },
    // 管理员设置
    {
      path: '/adminconfig',
      name: 'adminconfig',
      component: resolve => require(['@/pages/adminConfig/adminconfig.vue'], resolve),
    },
    {
      path: '/adminconfig/:dept',
      name: 'adminconfiglist',
      component: resolve => require(['@/pages/adminConfig/adminconfig.vue'], resolve),
      children:[{
        path: 'add',
        name: 'adminconfigadd',
        components:{
          modal: resolve=>require(['@/components/pop/adminConfig/addadmin.vue'],resolve),
        }
      }]
    },

    // 党员发展在线填表相关组件 开发用  组件对接后可删除
    {
      path: '/recruitMembers/onlinetable/2',
      component: resolve => require(['@/components/recruitMembers/onlinetable/2.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/3',
      component: resolve => require(['@/components/recruitMembers/onlinetable/3.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/4',
      component: resolve => require(['@/components/recruitMembers/onlinetable/4.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/6',
      component: resolve => require(['@/components/recruitMembers/onlinetable/6.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/8',
      component: resolve => require(['@/components/recruitMembers/onlinetable/8.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/9',
      component: resolve => require(['@/components/recruitMembers/onlinetable/9.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/11',
      component: resolve => require(['@/components/recruitMembers/onlinetable/11.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/12',
      component: resolve => require(['@/components/recruitMembers/onlinetable/12.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/13',
      component: resolve => require(['@/components/recruitMembers/onlinetable/13.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/14',
      component: resolve => require(['@/components/recruitMembers/onlinetable/14.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/15',
      component: resolve => require(['@/components/recruitMembers/onlinetable/15.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/16',
      component: resolve => require(['@/components/recruitMembers/onlinetable/16.vue'], resolve),
    },
    // {
    //   path: '/recruitMembers/onlinetable/发展对象亲属函调表',
    //   component: resolve => require(['@/components/recruitMembers/onlinetable/发展对象亲属函调表.vue'], resolve),
    // },
    {
      path: '/recruitMembers/onlinetable/19',
      component: resolve => require(['@/components/recruitMembers/onlinetable/19.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/21',
      component: resolve => require(['@/components/recruitMembers/onlinetable/21.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/23',
      component: resolve => require(['@/components/recruitMembers/onlinetable/23.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/29',
      component: resolve => require(['@/components/recruitMembers/onlinetable/29.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/31',
      component: resolve => require(['@/components/recruitMembers/onlinetable/31.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/32',
      component: resolve => require(['@/components/recruitMembers/onlinetable/32.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/33',
      component: resolve => require(['@/components/recruitMembers/onlinetable/33.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/35',
      component: resolve => require(['@/components/recruitMembers/onlinetable/35.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/36',
      component: resolve => require(['@/components/recruitMembers/onlinetable/36.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/37',
      component: resolve => require(['@/components/recruitMembers/onlinetable/37.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/39',
      component: resolve => require(['@/components/recruitMembers/onlinetable/39.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/40',
      component: resolve => require(['@/components/recruitMembers/onlinetable/40.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/43',
      component: resolve => require(['@/components/recruitMembers/onlinetable/43.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/44',
      component: resolve => require(['@/components/recruitMembers/onlinetable/44.vue'], resolve),
    },
    {
      path: '/recruitMembers/onlinetable/46',
      component: resolve => require(['@/components/recruitMembers/onlinetable/46.vue'], resolve),
    },

    { //默认首页
       path: '/',
       redirect: '/login'
    },

    { //默认错误页
      path: '*',
      component: resolve => require(['@/pages/404.vue'], resolve),
    },
  ]
})

export default router;

