import moment from 'moment'

export default {
  Live: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',
      width: 90
    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 230,
      render: (h, params) => {
        let texts = params.row.billNo
        if (params.row.billNo != null) {
          if (params.row.billNo.length > 20) {
            texts = params.row.billNo.slice(0, 20) + '...' // 进行数字截取
          } else {
            texts = params.row.billNo
          }
        }
        return h('Tooltip', {
            props: { placement: 'top' }
        }, [
          texts,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },params.row.billNo)
        ])
      },
    },
    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      width: 150,
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      }
    },

    {
      title: '玩法',
      align: 'center',
      key: 'gameName'
    },
    {
      title: '投注内容',
      align: 'center',
      key: 'betInfo',
      render: (h, params) => {
        let texts = params.row.betInfo
        if (params.row.betInfo != null) {
          if (params.row.betInfo.length > 9) {
            texts = params.row.betInfo.slice(0, 9) + '...' // 进行数字截取
          } else {
            texts = params.row.betInfo
          }
        }
        return h('Tooltip', {
            props: { placement: 'top' }
        }, [
          texts,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },params.row.betInfo)
        ])
      },
      // render: (h, params) => {
      //   return h('div', [
      //     h(
      //       'span',
      //       params.row.betInfo ? params.row.betInfo : '- -'
      //     )
      //   ])
      // },
      width: 180
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },
    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
    {
      title: '派彩',
      align: 'center',
      key: 'payoutAmount'
    },
  ],

  sport: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',
      width: 90
    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 150,
    },
    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      },
      width: 150
    },

    {
      title: '投注内容',
      align: 'center',
      key: 'betInfo',
      width: 300,
      render: (h, params) => {
        let code = JSON.parse(params.row.betInfo);
        if (params.row.betInfo != null) {
          return h('div', [
            h(
              'div',
              code[0].hometeamname + 'VS' + code[0].awayteamname
            ),
            h(
              'div',
              code[0].bettypename
            ),
            h(
              'div',
              code[0].teambetname?code[0].teambetname:"" + `(赔率${code[0].odds})`
            )
          ])
        } else {
          return h('div', [
            h(
              'span',
              '- -'
            )
          ])
        }

      }
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },

    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
    {
      title: '派彩',
      align: 'center',
      key: 'payoutAmount'
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      render: (h, params) => {
        let status

        switch (params.row.status) {
          case 0:
          status = "未结算";
          break;
        case 1:
          status = "赢";
          break;
        case 2:
          status = "输";
          break;
        case 3:
          status = "和";
          break;
        case 4:
          status = "已撤销";
          break;
        case 5:
          status = "系统撤销";
          break;
        }
        return h('div', [

          h(
            'span',
            status
          )
        ])
      }
    }
  ],

  chess: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',

    },
    {
      title: '游戏名称',
      align: 'center',
      key: 'gameName',

    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 200
    },

    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      width:128,
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      }
    },
    {
      title: '下注内容',
      align: 'center',
      key: 'betInfo',
      render: (h, params) => {

        return h('div', [
            h(
              'span',
              '--'
            )
          ]
        )

      }
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },
    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
    {
      title: '派彩',
      align: 'center',
      key: 'payoutAmount'
    },
  ]

}
