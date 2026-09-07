import { HikingEvent } from '../types.ts';

export const INITIAL_HIKING_EVENT: HikingEvent = {
  id: 'beipu-hiking-2026',
  title: '北埔徒步 · 绿色山野探索',
  subtitle: '新竹北埔冷泉与五指山风景区步道徒步活动',
  tag1: '年度秋季徒步巡礼',
  tag2: '生态护林行动',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpM1ao96D6s9PjEwi2mcRE-c3emT4sYvxeUwnBYMydaATGc1nMi-cUZHzoe7Rm5nBFG0PgUIlfSOAUkVdeAJTaNLqt0vVFnUs_CmcOSqNFEVbGPGoHkXGXpBRffnGjjwLaM8858vAhHQ0sro2iHqlH40B7OMDlG9qZlFQftf5sX0AmcKHbqYgjBYUNzew1qZ3cEHik_LSPtZF8H3W-5iay6xFnfKLovh-1Jhs-7Da3IfiTFw5a0m0VzA',
  elevationGain: '+680m',
  difficulty: '中等初级 (Moderate)',
  groupSize: 24,
  spotsLeft: 8,
  date: '2026年09月10日',
  timeRange: '07:30 - 15:30 (全天徒步体验)',
  timezone: 'Asia/Taipei / UTC800',
  departureCity: '北埔 (Beipu)',
  departureLocation: '新竹北埔冷泉与五指山风景区步道起点',
  departureCoords: '五指山登山口第一停车场（备有饮水补给）',
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw9C3_F1rSwR7Tjca1GLAGjwajBPhrx45aTWxD-vePZ9QSC8TdUdPDB0C6HPHLKDwGV22mnqdSVJ-iD-EmR8jzg9y3D4oDy-3gzfaG2bdoKn_CWjOsc3V8-dbrF1lFqMhgETRNbR77tzA6MICDgQj35cYQ9E0Gi0A18HnLlLqcOwIiVEoBqpMJ7NTMgmR2qbdOjOyzO1cZaB0RTzjjSMYnmEY2aaKjGcMIHxUoG06JrupIMynXfepGRQ',
  routeMapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMFvBO0fcCCi8xYc3hCds2ez0CoFoQqDny-iTMKfUH25ZjPhcn3mzog7mTGcJTL_gj1ka2t-RZ5PkYwfQWal3m9VdF3euLKJq_ehL7tNMvkzlHTGRb11oqN8yT_rpxHD0LJM6SiNcwz2lsBlgbG5PSE7zIAXPlePNOCAR1_OEw46NkzcOvvEvHWU_cZA0iYw-pqEiaPm1CawBrWzIsul-3bJJT1fSWwGKf8hM1SiW0rS16V0f6J5Ar3g',
  routeName: '五指山 - 鹅公髻山 纵走连线',
  routeType: '环状健行',
  distanceKm: 11.8,
  durationHours: 4.5,
  waterStationsCount: 3,
  maxAltitudeMeters: 1061,
  gearIntro: '北埔山区秋季午后多雾、湿度适中，请务必备妥轻量防风雨配置：',
  leader: {
    name: '廖经文',
    role: '领队 / 活动发起人',
    badge: '实名认证向导',
    phone: '0905254159',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdQG1JCeYonFRYMkvQ-UQvZYrdBpXGVwqt1Pqc8Pvf9U41KUhK_WHPNcedlJVFBuWxrKmPAIH-2hD4jX9DNQgLnL1o11m2n2jCMFjsRLJZrHuyP3yAJLK1yEKfpnow-9EP8hZ5RsoADsGbZlwNa6VLz71kTbV-Nch5csvDydnL54a9hxFRo7RGV9gaW6YhAZpeDpb2X1OnRd4tOm9QWrcCXx_KzCZMZCoX4gI9vfruYBOw7QUk7Gg4bA',
    bio: '国家高山向导执照，十年雪霸与中央山脉巡林向导经历，熟悉新竹五峰与北埔山区植被生态。',
    lineGroup: 'LINE 登山小队 (已有 16 人入群)',
    whatsappGroup: 'WhatsApp 互助组 (紧急留守连线)'
  },
  waypoints: [
    {
      id: 'wp-1',
      name: '五指山第一停车场 (起点)',
      elevation: 320,
      time: '07:30',
      distanceKm: 0,
      description: '集结清点装备、发放对讲机与行前生态热身拉伸。配备公用饮用水水源。',
      type: 'start'
    },
    {
      id: 'wp-2',
      name: '指玄宫与杉木林道',
      elevation: 610,
      time: '09:15',
      distanceKm: 3.4,
      description: '穿越百年柳杉林，空气负离子极高，有古石阶步道与木造观景亭。',
      type: 'scenic'
    },
    {
      id: 'wp-3',
      name: '中指峰观景台 (主峰)',
      elevation: 1061,
      time: '11:30',
      distanceKm: 6.2,
      description: '最高峰视野极佳，远眺竹东平原与雪霸圣棱线，进行45分钟轻食午休与补水。',
      type: 'summit'
    },
    {
      id: 'wp-4',
      name: '鹅公髻山冷泉山坳泉站',
      elevation: 780,
      time: '13:40',
      distanceKm: 8.9,
      description: '第三处山溪清泉补给点，林荫小径遮阴率达90%，坡度逐渐平缓。',
      type: 'water'
    },
    {
      id: 'wp-5',
      name: '北埔冷泉步道口 (终点)',
      elevation: 280,
      time: '15:30',
      distanceKm: 11.8,
      description: '回到冷泉休憩区，泡足舒缓登山疲劳，合影留念并解散或共乘返程。',
      type: 'end'
    }
  ],
  gearList: [
    {
      id: 'gear-1',
      name: '登山杖 (双杖为宜)',
      icon: 'hiking',
      iconColor: 'text-[#032517]',
      isMandatory: true,
      checked: true,
      category: 'essential',
      tips: '下坡时可有效减缓膝盖受力30%以上，推荐碳纤维或铝合金外锁款。'
    },
    {
      id: 'gear-2',
      name: '防滑抓地越野鞋',
      icon: 'footprints',
      iconColor: 'text-[#032517]',
      isMandatory: true,
      checked: true,
      category: 'essential',
      tips: '五指山步道部分路段有湿滑青苔与红泥，请勿穿平底板鞋或无抓地力运动鞋。'
    },
    {
      id: 'gear-3',
      name: '饮用水至少 2L',
      icon: 'droplet',
      iconColor: 'text-[#003a4d]',
      isMandatory: true,
      checked: false,
      category: 'nutrition',
      tips: '建议携带电解质冲剂，中途3处泉水站备有过滤水源可供补充。'
    },
    {
      id: 'gear-4',
      name: '遮阳帽与防晒品',
      icon: 'sun',
      iconColor: 'text-[#815433]',
      isMandatory: true,
      checked: true,
      category: 'apparel',
      tips: '山脊棱线午间无遮蔽处紫外线强，建议宽檐帽或带防紫外线颈帘。'
    },
    {
      id: 'gear-5',
      name: '个人常备简易急救包',
      icon: 'cross',
      iconColor: 'text-[#ba1a1a]',
      isMandatory: true,
      checked: false,
      category: 'safety',
      tips: '含创可贴、弹性绷带、防蚊虫膏、个人常用药品及消毒棉片。'
    },
    {
      id: 'gear-6',
      name: '轻量防风防水风衣',
      icon: 'shield',
      iconColor: 'text-[#032517]',
      isMandatory: false,
      checked: true,
      category: 'apparel',
      tips: '秋季山顶风大易失温，背包内常备一件轻量单层风雨衣。'
    },
    {
      id: 'gear-7',
      name: '离线轨迹APP (GPX导入)',
      icon: 'map-pin',
      iconColor: 'text-[#815433]',
      isMandatory: false,
      checked: false,
      category: 'safety',
      tips: '可提前在行前群下载领队分享的「北埔五指山环线.gpx」地图文件。'
    }
  ],
  comments: [
    {
      id: 'c-1',
      author: '陈佩佩 (Pei-Pei)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNv4T49msmuZaZ9LfO633aq3cUtWVJuiR6JxyrwqvEXCV9ikDMc8BpyAiZrvdUWLtK-YR6fRtv66eXUdpMhK7kht7n4bhxn9slUQMB8rSlJ550T7AdyMlN6vNHqjSWFsYs5NO-fVsVgFU2COUsBWaPddMAKBD416n8HpvBNIl8ZICecTgbkjxN6LOdbff60aX73VjXoBiD94X_GcfeIZDryHX3uog9coBwxXRkZrIWgr0jnW75nkXSJA',
      time: '2小时前',
      content: '请问集合点新竹北埔冷泉周边方便停车吗？当天早上新竹市区是否有伙伴想要一同共乘车资平摊？',
      likes: 6,
      userLiked: false,
      reply: {
        id: 'r-1',
        author: '领队 廖经文',
        role: '领队',
        time: '1小时前',
        content: '第一停车场有约40个免费车位，建议提前15分钟到达。共乘可在LINE群接龙分配！'
      }
    },
    {
      id: 'c-2',
      author: 'Mark 林子轩',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhxsd0BH0TxwNCU8gPuMaQ8pkE7-Nj4_R_ZRw-4GWv4EEimfD5xlB5tCaA9BN2IGT6c-LGaqlNwEWIIKEmFmLV2GX5tTtMGxV2ezMvwdqrDZL1KQZ-Yo6kM0O5wuwFZVClQBIzHYXWF4grW47IV3rFkGoqwtjfRIPa4jBuuemj85P4sYwzDY4hzSgqgRRs3aC_E7_xYh9Dw2GiEIQXgx7K4QNUzNOhoJBtdKCfxmiUTWHBQuKUCQaiqg',
      time: '昨天 19:40',
      content: '太期待了！已备好双杖，这次路线沿途茶园与杉木林的拍照点很多，期待跟山友们相遇！',
      likes: 12,
      userLiked: true
    }
  ]
};
