import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ── Photo spots & Restaurant data ──

const R1_PHOTOS = [
  { name: 'Skyline观景台', tip: '日落前1小时到，占靠窗位，拍Wakatipu湖全景', image: 'https://loremflickr.com/300/200/queenstown-skyline-view' },
  { name: 'Glenorchy栈桥', tip: '退到栈桥尽头回拍，红房子+雪山倒影', image: 'https://loremflickr.com/300/200/glenorchy-jetty-lake' },
  { name: 'Paradise Road', tip: '第3个弯道靠边停，蹲低拍公路延伸进雪山', image: 'https://loremflickr.com/300/200/glenorchy-paradise' },
  { name: 'Arrowtown秋色', tip: '白金汉街中段，坡上往下拍彩色小屋+远山', image: 'https://loremflickr.com/300/200/arrowtown-autumn' },
  { name: '孤独的树', tip: '清晨无风时去，水中倒影最完整，广角靠近水边拍', image: 'https://loremflickr.com/300/200/wanaka-tree-lake' },
  { name: 'Crown Range公路', tip: '最高点观景台停车，拍之字形公路盘旋', image: 'https://loremflickr.com/300/200/crown-range-road' },
]

const R1_RESTAURANTS = [
  { name: 'Fergburger', dish: 'Big Al双层牛肉堡', price: '$15', tip: '错峰下午3点去不用排队，套餐加薯条$5', image: 'https://loremflickr.com/300/200/fergburger' },
  { name: 'Rata', dish: '惠灵顿牛排', price: '$45', tip: '需要提前一周订位，周二不营业', image: 'https://loremflickr.com/300/200/rata-restaurant' },
  { name: 'Bespoke Kitchen', dish: '牛油果吐司+flat white', price: '$22', tip: '周日brunch人最多等30分钟，建议平日去', image: 'https://loremflickr.com/300/200/bespoke-kitchen' },
  { name: 'Flame Bar & Grill', dish: '招牌猪肋排半架', price: '$28', tip: '湖景位要提前订，份量大两个人分一份足够', image: 'https://loremflickr.com/300/200/flame-grill' },
  { name: 'Kika', dish: '当季tasting menu', price: '$65', tip: '菜单每周换，窗边位看Wanaka湖日落', image: 'https://loremflickr.com/300/200/kika-wanaka' },
]

const R2_PHOTOS = [
  { name: '好牧人教堂', tip: '日出前到，拍教堂+雪山+湖面晨雾，夏天鲁冰花做前景', image: 'https://loremflickr.com/300/200/church-good-shepherd' },
  { name: 'Lake Pukaki观景台', tip: 'Visitor Centre停车，拍奶蓝色湖水+Aoraki雪山', image: 'https://loremflickr.com/300/200/lake-pukaki-view' },
  { name: 'Hooker Valley步道', tip: '第二座吊桥是最佳机位，吊桥+Aoraki雪山', image: 'https://loremflickr.com/300/200/hooker-valley-bridge' },
  { name: 'Christchurch Gondola', tip: '山顶站拍Canterbury平原+Lytellton港全景', image: 'https://loremflickr.com/300/200/christchurch-gondola' },
]

const R2_RESTAURANTS = [
  { name: 'Fairlie Bakehouse', dish: '三文鱼派+pork belly pie', price: '$8-12', tip: '排队但很快，中午12点前品种最全', image: 'https://loremflickr.com/300/200/fairlie-bakehouse' },
  { name: 'Kohan Japanese', dish: '三文鱼donburi', price: '$25', tip: 'Tekapo唯一日料，湖景位要提前到', image: 'https://loremflickr.com/300/200/kohan-tekapo' },
  { name: 'Old Mountaineers Cafe', dish: 'Mt Cook burger+热巧克力', price: '$22', tip: '库克山脚下最暖和的午餐点，窗景一流', image: 'https://loremflickr.com/300/200/old-mountaineers' },
  { name: 'Dark Sky Diner', dish: '星空主题鸡尾酒+羊肉', price: '$35', tip: '观星后直接来吃，Deep South冰淇淋必点', image: 'https://loremflickr.com/300/200/dark-sky-diner' },
]

const R3_PHOTOS = [
  { name: 'Milford Sound游船甲板', tip: '船头最前面，下雨天瀑布最壮观，广角拍Mitre Peak', image: 'https://loremflickr.com/300/200/milford-sound-boat' },
  { name: 'Lindis Pass', tip: '最高点停车，拍金色草甸+蜿蜒公路', image: 'https://loremflickr.com/300/200/lindis-pass-highway' },
  { name: '镜湖', tip: '清晨无风时倒影最完美，木栈道走到最里面', image: 'https://loremflickr.com/300/200/mirror-lakes-nz' },
  { name: 'Tekapo Springs', tip: '温泉池里朝湖方向拍日落+雪山', image: 'https://loremflickr.com/300/200/tekapo-springs' },
  { name: 'Arrowtown白金汉街', tip: '秋天4月底最美，金黄落叶+彩色小屋+远山', image: 'https://loremflickr.com/300/200/arrowtown-buckingham' },
]

const R3_RESTAURANTS = [
  { name: 'Fergburger', dish: 'Big Al双层牛肉堡', price: '$15', tip: '晚上11点后去几乎不用排队', image: 'https://loremflickr.com/300/200/fergburger-night' },
  { name: 'The Hermitage Alpine', dish: 'High Country buffet', price: '$65', tip: '晚餐必须预订，靠窗位看Aoraki日落', image: 'https://loremflickr.com/300/200/hermitage-restaurant' },
  { name: 'Kika', dish: 'lamb shoulder sharing', price: '$42', tip: '一定要点现烤focaccia配dukkah', image: 'https://loremflickr.com/300/200/kika-dish' },
  { name: 'Skyline自助', dish: '海鲜青口+甜点pavlova', price: '$59含缆车', tip: '日落时段最抢手，提前2周订位', image: 'https://loremflickr.com/300/200/skyline-buffet' },
]

async function main() {
  // Clean existing data for idempotent re-runs
  await prisma.routeVariant.deleteMany()
  await prisma.routeDestination.deleteMany()
  await prisma.post.deleteMany()
  await prisma.route.deleteMany()
  await prisma.destination.deleteMany()
  console.log('Cleared existing data')

  // ── Destinations ──
  const destinations = await Promise.all([
    prisma.destination.create({ data: { name: '皇后镇', slug: 'queenstown', region: '南岛', coordinates: '-45.0312,168.6626', coverImage: 'https://loremflickr.com/640/480/queenstown,lake-wakatipu,remarkables,mountains', description: '新西兰冒险之都，坐落在Wakatipu湖畔，被卓越山脉环绕', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '夏季12-2月最佳，秋季4-5月颜色最美', ticketPrice: 'Skyline缆车$59，蒸汽船$95，大部分自然景点免费', transport: '皇后镇机场(ZQN)，市区步行可达，周边需自驾或一日游巴士', stayDuration: '建议至少2-3天，极限运动爱好者可待5天', nearbySpots: [{ name: '箭镇', distance: '20分钟车程', slug: 'arrowtown' }, { name: '格林诺奇', distance: '45分钟车程', slug: 'glenorchy' }, { name: '瓦纳卡', distance: '1小时车程', slug: 'wanaka' }], accommodation: '穷游YHA$35起，舒适Novotel$220起，奢华Eichardts$1200起', xhsTags: ['皇后镇攻略', '皇后镇美食', '皇后镇跳伞', '皇后镇滑雪'] }) } }),
    prisma.destination.create({ data: { name: '格林诺奇', slug: 'glenorchy', region: '南岛', coordinates: '-44.8512,168.3814', coverImage: 'https://loremflickr.com/640/480/glenorchy,new-zealand,lotr,paradise-road', description: '魔戒取景地，天堂之路的起点', type: 'natural_attraction', practicalInfo: JSON.stringify({ bestSeason: '全年皆可，夏季绿意盎然，冬季雪山背景更壮观', ticketPrice: '免费，大部分景点无需门票', transport: '从皇后镇自驾45分钟，路况好但弯多，也可参加一日游团', stayDuration: '建议半天到1天，深度游可住1晚', nearbySpots: [{ name: '皇后镇', distance: '45分钟车程', slug: 'queenstown' }, { name: 'Paradise Road', distance: '同区域', slug: 'glenorchy' }], accommodation: 'Glenorchy Hotel$150起，Kinloch Lodge$120起', xhsTags: ['格林诺奇攻略', '魔戒取景地', '新西兰南岛'] }) } }),
    prisma.destination.create({ data: { name: '箭镇', slug: 'arrowtown', region: '南岛', coordinates: '-44.9385,168.8284', coverImage: 'https://loremflickr.com/640/480/arrowtown,new-zealand,autumn-colors,gold-rush', description: '历史金矿小镇，秋天最美', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '秋季4月底最佳，金黄落叶+彩色小屋绝美', ticketPrice: '免费，博物馆$5', transport: '从皇后镇自驾20分钟或乘公交#2路', stayDuration: '建议半天', nearbySpots: [{ name: '皇后镇', distance: '20分钟车程', slug: 'queenstown' }, { name: '瓦纳卡', distance: '50分钟车程', slug: 'wanaka' }], accommodation: '多在皇后镇住宿，Arrowtown House$200起', xhsTags: ['箭镇攻略', '箭镇秋天', '新西兰南岛'] }) } }),
    prisma.destination.create({ data: { name: '瓦纳卡', slug: 'wanaka', region: '南岛', coordinates: '-44.6968,169.1312', coverImage: 'https://loremflickr.com/640/480/wanaka,that-wanaka-tree,lake,new-zealand', description: '孤独的树所在，比皇后镇更安静', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '全年皆可，春夏湖光山色，冬季可去Cardrona滑雪', ticketPrice: 'Puzzling World$25，Roys Peak免费，大部分景点免费', transport: '从皇后镇自驾1小时经Crown Range，或1.5小时经SH6', stayDuration: '建议1-2天', nearbySpots: [{ name: '皇后镇', distance: '1小时车程', slug: 'queenstown' }, { name: '箭镇', distance: '50分钟车程', slug: 'arrowtown' }], accommodation: '穷游YHA$38起，舒适Edgewater$280起', xhsTags: ['瓦纳卡攻略', '孤独的树', 'Roys Peak', '新西兰南岛'] }) } }),
    prisma.destination.create({ data: { name: '基督城', slug: 'christchurch', region: '南岛', coordinates: '-43.5320,172.6306', coverImage: 'https://loremflickr.com/640/480/christchurch,new-zealand,botanic-gardens,avon-river', description: '花园城市，南岛门户', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '春夏最佳，花园城市名副其实', ticketPrice: 'Gondola$35，punting$40，Botanic Gardens免费', transport: '基督城机场(CHC)，南岛最大交通枢纽，市区有公交和tram', stayDuration: '建议1-2天作为南岛门户', nearbySpots: [{ name: 'Akaroa', distance: '1.5小时车程', slug: 'christchurch' }, { name: '蒂卡波湖', distance: '3小时车程', slug: 'tekapo' }], accommodation: '穷游Jailhouse$35起，舒适Observatory$250起', xhsTags: ['基督城攻略', '基督城美食', '新西兰南岛'] }) } }),
    prisma.destination.create({ data: { name: '蒂卡波湖', slug: 'tekapo', region: '南岛', coordinates: '-44.0047,170.4771', coverImage: 'https://loremflickr.com/640/480/lake-tekapo,church-of-good-shepherd,lupins,new-zealand', description: '星空保护区，好牧人教堂', type: 'natural_attraction', practicalInfo: JSON.stringify({ bestSeason: '夏季鲁冰花盛开(12-1月)，冬季星空最清晰', ticketPrice: '好牧人教堂免费，Tekapo Springs$30，Dark Sky观星团$150', transport: '从基督城沿SH8自驾3小时，无公共交通', stayDuration: '建议1-2晚', nearbySpots: [{ name: '库克山', distance: '1.5小时车程', slug: 'mt-cook' }, { name: 'Lake Pukaki', distance: '30分钟车程', slug: 'mt-cook' }], accommodation: '穷游Holiday Park$40起，舒适Peppers$300起', xhsTags: ['Tekapo攻略', '蒂卡波湖', '新西兰星空', '好牧人教堂'] }) } }),
    prisma.destination.create({ data: { name: '库克山', slug: 'mt-cook', region: '南岛', coordinates: '-43.5956,170.1419', coverImage: 'https://loremflickr.com/640/480/aoraki,mount-cook,hooker-valley,new-zealand', description: '新西兰最高峰，Hooker Valley徒步', type: 'natural_attraction', practicalInfo: JSON.stringify({ bestSeason: '夏季徒步季(11-4月)，冬季雪景壮观但部分步道关闭', ticketPrice: 'Hooker Valley Track免费，直升机冰川徒步$450起', transport: '从Tekapo自驾1.5小时沿SH80，沿途Lake Pukaki景观路', stayDuration: '建议1晚', nearbySpots: [{ name: '蒂卡波湖', distance: '1.5小时车程', slug: 'tekapo' }], accommodation: 'The Hermitage$400起，Backpacker Lodge$45起', xhsTags: ['库克山攻略', 'Hooker Valley', '新西兰冰川'] }) } }),
    prisma.destination.create({ data: { name: '米尔福德峡湾', slug: 'milford-sound', region: '南岛', coordinates: '-44.6414,167.8974', coverImage: 'https://loremflickr.com/640/480/milford-sound,mitre-peak,waterfall,new-zealand', description: '世界第八大奇迹', type: 'natural_attraction', practicalInfo: JSON.stringify({ bestSeason: '全年，雨天瀑布更壮观，夏季晴天多', ticketPrice: '游船$65-140，小飞机观光$395起', transport: '从皇后镇自驾4小时或参加一日游巴士，Te Anau出发2小时', stayDuration: '建议1天(一日游)，深度游可在Te Anau住', nearbySpots: [{ name: '蒂阿瑙', distance: '2小时车程', slug: 'te-anau' }], accommodation: '多在Te Anau或皇后镇住宿', xhsTags: ['米尔福德峡湾', 'Milford Sound', '新西兰南岛'] }) } }),
    prisma.destination.create({ data: { name: '奥克兰', slug: 'auckland', region: '北岛', coordinates: '-36.8485,174.7633', coverImage: 'https://loremflickr.com/640/480/auckland,sky-tower,viaduct-harbour,new-zealand', description: '千帆之都，新西兰最大城市', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '全年温和，夏季最适合户外', ticketPrice: '天空塔$35，Waiheke渡轮$45往返', transport: '奥克兰机场(AKL)，国际门户，市区公交+Uber方便', stayDuration: '建议1-2天', nearbySpots: [{ name: '霍比屯', distance: '2小时车程', slug: 'hobbiton' }], accommodation: '穷游YHA$35起，舒适SO/ Auckland$280起', xhsTags: ['奥克兰攻略', '奥克兰美食', '新西兰北岛'] }) } }),
    prisma.destination.create({ data: { name: '霍比屯', slug: 'hobbiton', region: '北岛', coordinates: '-37.8723,175.6832', coverImage: 'https://loremflickr.com/640/480/hobbiton,movie-set,shire,new-zealand', description: '指环王夏尔村取景地', type: 'activity_spot', practicalInfo: JSON.stringify({ bestSeason: '全年，春夏绿意最配夏尔', ticketPrice: '电影布景游$89起，需提前预订', transport: '从奥克兰自驾2小时或从Rotorua参加一日游', stayDuration: '建议半天', nearbySpots: [{ name: '罗托鲁瓦', distance: '1小时车程', slug: 'rotorua' }], accommodation: '多在Rotorua或奥克兰住宿', xhsTags: ['霍比屯攻略', '指环王取景地', '新西兰北岛'] }) } }),
    prisma.destination.create({ data: { name: '罗托鲁瓦', slug: 'rotorua', region: '北岛', coordinates: '-38.1368,176.2497', coverImage: 'https://loremflickr.com/640/480/rotorua,wai-o-tapu,geothermal,new-zealand', description: '地热奇观，毛利文化中心', type: 'city', practicalInfo: JSON.stringify({ bestSeason: '全年，地热不受季节影响', ticketPrice: 'Wai-O-Tapu$35，Te Puia$70，Polynesian Spa$30起', transport: '从奥克兰自驾2.5小时或乘大巴', stayDuration: '建议1-2晚', nearbySpots: [{ name: '霍比屯', distance: '1小时车程', slug: 'hobbiton' }, { name: '汤加里罗', distance: '2小时车程', slug: 'tongariro' }], accommodation: 'Ramada$180起，Millennium$200起', xhsTags: ['罗托鲁瓦攻略', '地热公园', '毛利文化'] }) } }),
    prisma.destination.create({ data: { name: '汤加里罗', slug: 'tongariro', region: '北岛', coordinates: '-39.2908,175.5673', coverImage: 'https://loremflickr.com/640/480/tongariro,alpine-crossing,emerald-lakes,new-zealand', description: '末日火山，史诗级一日穿越', type: 'natural_attraction', practicalInfo: JSON.stringify({ bestSeason: '夏季11-4月适合徒步，冬季需冰爪', ticketPrice: 'Tongariro Alpine Crossing免费，接驳车$45往返', transport: '从Rotorua自驾2小时或从奥克兰4.5小时', stayDuration: '建议1-2晚', nearbySpots: [{ name: '罗托鲁瓦', distance: '2小时车程', slug: 'rotorua' }], accommodation: 'Chateau Tongariro$250起，Tongariro Holiday Park$30起', xhsTags: ['汤加里罗攻略', 'Tongariro Crossing', '末日火山'] }) } }),
  ])

  const [queenstown, glenorchy, arrowtown, wanaka, christchurch, tekapo, mtCook, milford, auckland, hobbiton, rotorua, tongariro] = destinations

  // ── Route 1: 皇后镇+周边 (3-5天) ──
  const r1 = await prisma.route.create({
    data: {
      title: '皇后镇+周边精华',
      slug: 'queenstown-surroundings',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/south-island,new-zealand,mountains,lake',
      description: '以皇后镇为中心，覆盖Glenorchy、Arrowtown、Wanaka的最经典短途路线',
      bestSeason: JSON.stringify(['summer', 'autumn', 'spring']),
      typeTags: JSON.stringify(['自驾公路', '极限运动', '自然徒步']),
      featuredOrder: 1,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r1.id, destinationId: queenstown.id, dayIndex: 1 },
      { routeId: r1.id, destinationId: glenorchy.id, dayIndex: 2 },
      { routeId: r1.id, destinationId: arrowtown.id, dayIndex: 2 },
      { routeId: r1.id, destinationId: wanaka.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r1.id, duration: '3-5天', budgetLevel: '穷游',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown'], activities: ['皇后镇湖畔漫步', 'Skyline缆车+山顶自助餐', '小镇逛街'], transport: '步行+缆车', meals: '午餐自理 晚餐Skyline自助', accommodation: 'YHA Queenstown Lakefront (床位$35)', costBreakdown: { 住宿: 35, 交通: 0, 餐饮: 65, 门票: 59, 活动: 0 } },
          { day: 2, locations: ['glenorchy', 'arrowtown'], activities: ['Glenorchy栈桥+红房子拍照', 'Paradise Road驾车探索', 'Arrowtown白金汉街散步', '箭河淘金体验'], transport: '自驾 (租车$60/天÷人数)', meals: '午餐Arrowtown Bakery 晚餐皇后镇Fergburger', accommodation: 'YHA Queenstown Lakefront (床位$35)', costBreakdown: { 住宿: 35, 交通: 30, 餐饮: 40, 门票: 0, 活动: 10 } },
          { day: 3, locations: ['wanaka'], activities: ['Crown Range公路', '孤独的树拍照', 'Roys Peak徒步(可选免费)或Puzzling World($25)'], transport: '自驾', meals: '午餐Wanaka湖畔cafe 晚餐回皇后镇', accommodation: 'YHA Queenstown Lakefront (床位$35)', costBreakdown: { 住宿: 35, 交通: 30, 餐饮: 45, 门票: 25, 活动: 0 } }
        ]),
        totalBudgetMin: 450, totalBudgetMax: 650
      },
      {
        routeId: r1.id, duration: '3-5天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown'], activities: ['皇后镇湖畔漫步', 'TSS Earnslaw蒸汽船+Walter Peak农场', 'Skyline缆车+山顶晚餐+Luge滑板车'], transport: '步行+蒸汽船+缆车', meals: '午餐湖畔cafe 晚餐Skyline自助', accommodation: 'Novotel Queenstown ($220)', morningNote: '9:00 湖边步道散步适应时差，沿途很多拍照点，湖面+雪山背景怎么拍都出片 → 10:30 去蒸汽船码头换票（提前15分钟到，船不等人）', afternoonNote: '12:00 蒸汽船出发（船上有钢琴演奏+引擎室参观） → 抵达Walter Peak农场后自助午餐+剪羊毛秀 → 15:30返程 → 16:30 乘Skyline缆车上山，山顶观景台拍Wakatipu全景', eveningNote: '18:30 Skyline自助餐窗边位看日落（需提前订位）→ 20:00 玩Luge滑板车（夜间灯光+湖景超酷） → 22:00之前下山缆车末班', weatherTip: '皇后镇天气多变，早上出门带薄外套，山顶晚上降温需加厚外套（夏天山顶也冷）', costBreakdown: { 住宿: 220, 交通: 95, 餐饮: 100, 门票: 59, 活动: 15 }, photoSpots: [{ name: 'Skyline观景台', tip: '日落前1小时到，占靠窗位，拍Wakatipu湖全景', image: 'https://loremflickr.com/300/200/queenstown-skyline-view' }, { name: 'Glenorchy栈桥', tip: '退到栈桥尽头回拍，红房子+雪山倒影', image: 'https://loremflickr.com/300/200/glenorchy-jetty-lake' }], restaurants: [{ name: 'Fergburger', dish: 'Big Al双层牛肉堡', price: '$15', tip: '错峰下午3点去不用排队，套餐加薯条$5', image: 'https://loremflickr.com/300/200/fergburger' }, { name: 'Rata', dish: '惠灵顿牛排', price: '$45', tip: '需要提前一周订位，周二不营业', image: 'https://loremflickr.com/300/200/rata-restaurant' }] },
          { day: 2, locations: ['glenorchy', 'arrowtown'], activities: ['Glenorchy Dart River快艇', 'Paradise Road拍照', 'Arrowtown湖畔步道', 'The Winery品酒'], transport: '自驾 (租车$80/天)', meals: '午餐Glenorchy Cafe 晚餐The Bunker', accommodation: 'Novotel Queenstown ($220)', morningNote: '8:00 取车出发去Glenorchy（45分钟，沿途Lake Wakatipu景观路超美）→ 9:00 Dart River快艇check-in（全程2小时，会发防水外套） → 快艇在Dart River上漂移超刺激+雪山背景', afternoonNote: '12:00 Glenorchy Cafe午餐 → 13:30 开车走Paradise Road（土路但轿车能走，第3个弯道最佳拍照点） → 15:00 返程经过Arrowtown → 白金汉街从头走到尾40分钟 → 16:30 The Winery品酒（$15/人试6款Central Otago酒）', eveningNote: '18:30 Arrowtown或回皇后镇 → 19:30 The Bunker晚餐（隐藏在小巷里的speakeasy风格，鸡尾酒$18起） → 21:00 回酒店休息', weatherTip: 'Glenorchy早上常有晨雾，9点后散开最佳拍照时间。如果下雨Dart River快艇照常开（发防水装备）', costBreakdown: { 住宿: 220, 交通: 40, 餐饮: 120, 门票: 0, 活动: 249 }, photoSpots: [{ name: 'Paradise Road', tip: '第3个弯道靠边停，蹲低拍公路延伸进雪山', image: 'https://loremflickr.com/300/200/glenorchy-paradise' }, { name: 'Arrowtown秋色', tip: '白金汉街中段，坡上往下拍彩色小屋+远山', image: 'https://loremflickr.com/300/200/arrowtown-autumn' }], restaurants: [{ name: 'Bespoke Kitchen', dish: '牛油果吐司+flat white', price: '$22', tip: '周日brunch人最多等30分钟，建议平日去', image: 'https://loremflickr.com/300/200/bespoke-kitchen' }] },
          { day: 3, locations: ['wanaka'], activities: ['Crown Range公路', '孤独的树', 'Puzzling World', 'Rippon Vineyard品酒'], transport: '自驾', meals: '午餐Wanaka Gourmet Kitchen 晚餐Kika', accommodation: 'Edgewater Wanaka ($280)', morningNote: '9:00 出发走Crown Range公路（新西兰最高柏油路，最高点1076米）→ 山顶观景台停车拍照 → 10:30 到达Wanaka → 直接去孤独的树（上午光线拍雪山背景最好）', afternoonNote: '12:30 Wanaka Gourmet Kitchen午餐（湖边位）→ 14:00 Puzzling World（迷宫+倾斜屋$25，超适合拍照）→ 16:00 Rippon Vineyard品酒（免费！风景比酒更值得，俯瞰Wanaka湖全景）', eveningNote: '18:00 Edgewater酒店check-in → 19:30 Kika晚餐（一定要点现烤focaccia配dukkah$12） → 21:00 湖边散步看晚霞，Wanaka晚上超安静', weatherTip: 'Crown Range冬天可能结冰封路，出发前查NZTA路况。Wanaka比皇后镇冷3-5度', costBreakdown: { 住宿: 280, 交通: 40, 餐饮: 130, 门票: 25, 活动: 15 }, photoSpots: [{ name: '孤独的树', tip: '清晨无风时去，水中倒影最完整，广角靠近水边拍', image: 'https://loremflickr.com/300/200/wanaka-tree-lake' }, { name: 'Crown Range公路', tip: '最高点观景台停车，拍之字形公路盘旋', image: 'https://loremflickr.com/300/200/crown-range-road' }], restaurants: [{ name: 'Flame Bar & Grill', dish: '招牌猪肋排半架', price: '$28', tip: '湖景位要提前订，份量大两个人分一份足够', image: 'https://loremflickr.com/300/200/flame-grill' }, { name: 'Kika', dish: '当季tasting menu', price: '$65', tip: '菜单每周换，窗边位看Wanaka湖日落', image: 'https://loremflickr.com/300/200/kika-wanaka' }] },
          { day: 4, locations: ['queenstown'], activities: ['Nevis蹦极', 'Shotover喷射快艇', 'Onsen Hot Pools'], transport: '含接送', meals: '午餐Fergburger 晚餐Rata', accommodation: 'Novotel Queenstown ($220)', morningNote: '8:00 Nevis蹦极接送（提前一周预约！市中心集合点出发） → 45分钟山路到蹦极点 → 134米自由落体8.5秒！跳完会有证书 → 11:30 回市区', afternoonNote: '12:30 午餐Fergburger（错峰下午去不用排长队，Big Al$15够两人分） → 14:00 Shotover喷射快艇（25分钟，360度旋转超刺激，会发救生衣） → 16:00 Onsen Hot Pools温泉（提前订日落时段最抢手，私人池看Shotover河峡谷）', eveningNote: '19:30 Rata晚餐（Josh Emett的餐厅，惠灵顿牛排$45是招牌，需提前一周订位） → 21:30 泡完温泉全身放松直接回酒店秒睡', weatherTip: '蹦极和快艇受天气影响小，下雨照常。温泉有顶棚下雨更浪漫', costBreakdown: { 住宿: 220, 交通: 0, 餐饮: 110, 门票: 0, 活动: 500 } },
          { day: 5, locations: ['queenstown'], activities: ['Ben Lomond徒步(半天)', 'Kiwi Birdlife Park', '下午自由购物'], transport: '步行', meals: '午餐Bespoke Kitchen 晚餐Flame Bar & Grill', accommodation: 'Novotel Queenstown ($220)', morningNote: '7:00 出发Ben Lomond徒步（从Skyline缆车站开始，全程6-8小时，可选只走到Saddle 3-4小时） → 一路上升俯瞰Wakatipu湖全景+卓越山脉，早上光线最佳 → 体力一般建议只到Saddle也很美', afternoonNote: '13:00 Bespoke Kitchen午餐（牛油果吐司$22+flat white，MCT油咖啡是特色） → 15:00 Kiwi Birdlife Park（就在缆车站旁边，$50看Kiwi鸟和NZ本土动物，1小时逛完） → 16:00 自由购物（Shotover Street户外品牌很全，Icebreaker/Macpac打折多）', eveningNote: '19:00 Flame Bar & Grill晚餐（招牌猪肋排$28半架够一个人，湖景位需提前订） → 21:00 湖边最后散步，准备明天离境', weatherTip: 'Ben Lomond天气好才走，山顶风速超过40km/h不建议上。出发前在酒店前台问天气', costBreakdown: { 住宿: 220, 交通: 0, 餐饮: 90, 门票: 50, 活动: 0 } }
        ]),
        totalBudgetMin: 3200, totalBudgetMax: 4000
      }
    ]
  })

  // ── Route 2: 基督城+Tekapo+库克山 (3-5天) ──
  const r2 = await prisma.route.create({
    data: {
      title: '基督城+Tekapo+库克山',
      slug: 'christchurch-tekapo-mtcook',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/south-island,new-zealand,mountains,lake',
      description: '南岛中线的经典短途，星空+雪山+湖泊的极致组合',
      bestSeason: JSON.stringify(['summer', 'autumn', 'winter', 'spring']),
      typeTags: JSON.stringify(['自然徒步', '冰川湖泊', '自驾公路']),
      featuredOrder: 2,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r2.id, destinationId: christchurch.id, dayIndex: 1 },
      { routeId: r2.id, destinationId: tekapo.id, dayIndex: 2 },
      { routeId: r2.id, destinationId: mtCook.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r2.id, duration: '3-5天', budgetLevel: '穷游',
        itinerary: JSON.stringify([
          { day: 1, locations: ['christchurch'], activities: ['基督城Botanical Gardens', '纸板教堂', 'Riverside Market'], transport: '步行', meals: '午餐Riverside 晚餐自行解决', accommodation: 'Jailhouse Accommodation (床位$35)', costBreakdown: { 住宿: 35, 交通: 0, 餐饮: 40, 门票: 0, 活动: 0 } },
          { day: 2, locations: ['tekapo'], activities: ['自驾SH8公路(3h)', '好牧人教堂', 'Tekapo Springs温泉', '夜晚观星'], transport: '自驾', meals: '午餐Fairlie Bakehouse 晚餐Kohan Japanese', accommodation: 'Lake Tekapo Holiday Park ($40)', costBreakdown: { 住宿: 40, 交通: 30, 餐饮: 50, 门票: 0, 活动: 30 } },
          { day: 3, locations: ['mt-cook'], activities: ['Hooker Valley Track徒步(3h往返)', 'Tasman Glacier View', '返回基督城(4h)'], transport: '自驾', meals: '午餐自备三明治 晚餐基督城', accommodation: 'Jailhouse Accommodation (床位$35)', costBreakdown: { 住宿: 35, 交通: 40, 餐饮: 30, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 380, totalBudgetMax: 550
      },
      {
        routeId: r2.id, duration: '3-5天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['christchurch'], activities: ['Christchurch Gondola', 'Botanical Gardens', '雅芳河punting', 'Riverside Market晚餐'], transport: 'Uber+步行', meals: '午餐C1 Espresso 晚餐Riverside', accommodation: 'The Observatory Hotel ($250)', morningNote: '10:00 基督城机场取车 → 市区Check-in → 11:00 Gondola缆车上山（山顶站拍Canterbury平原+Lytellton港全景，咖啡厅可坐半小时）', afternoonNote: '13:00 C1 Espresso午餐（旧邮局改造的网红餐厅，食物通过气压管道送到桌前！）→ 14:30 Botanical Gardens + 雅芳河punting（$40/人30分钟，穿校服的船夫用长竿撑船很像剑桥）', eveningNote: '17:30 Riverside Market（室内美食市场，周末有live music）→ 19:00 晚餐选市场里的摊位（推荐Greek Gods的souvlaki $16）→ 21:00 回酒店休息准备明天长途驾驶', weatherTip: '基督城比南岛其他地方暖和，春秋一件外套即可', costBreakdown: { 住宿: 250, 交通: 30, 餐饮: 100, 门票: 35, 活动: 40 }, photoSpots: [{ name: 'Christchurch Gondola', tip: '山顶站拍Canterbury平原+Lytellton港全景', image: 'https://loremflickr.com/300/200/christchurch-gondola' }], restaurants: [{ name: 'Fairlie Bakehouse', dish: '三文鱼派+pork belly pie', price: '$8-12', tip: '排队但很快，中午12点前品种最全', image: 'https://loremflickr.com/300/200/fairlie-bakehouse' }] },
          { day: 2, locations: ['tekapo'], activities: ['自驾SH8(3h)', '好牧人教堂', 'Dark Sky Project观星团', 'Tekapo Springs'], transport: '自驾', meals: '午餐Fairlie Bakehouse 晚餐Dark Sky Diner', accommodation: 'Peppers Bluewater Resort ($300)', morningNote: '8:00 基督城出发走SH1转SH79转SH8 → 10:00 经停Fairlie Bakehouse（三文鱼派$8必吃！12点前品种最全，可以买几个当午餐） → 11:30 到达Tekapo先去好牧人教堂（上午顺光拍教堂正面）', afternoonNote: '13:00 教堂+湖边拍照 → 14:30 Lake Pukaki观景台（开去Mt Cook方向15分钟，Visitor Centre停车，奶蓝色湖水+Aoraki雪山背景绝了） → 16:00 Tekapo Springs泡温泉$30（湖景池看雪山）', eveningNote: '18:30 Dark Sky Diner晚餐（羊肉$35+Deep South冰淇淋$8必点） → 22:00 Dark Sky Project观星团（$150含中文导游+天文望远镜，全程2小时） → 00:00 回酒店看银河入睡', weatherTip: 'Tekapo晚上冷！观星带最厚的衣服，冬天零下5度+风，手套帽子必备', costBreakdown: { 住宿: 300, 交通: 40, 餐饮: 100, 门票: 0, 活动: 150 }, photoSpots: [{ name: '好牧人教堂', tip: '日出前到，拍教堂+雪山+湖面晨雾，夏天鲁冰花做前景', image: 'https://loremflickr.com/300/200/church-good-shepherd' }, { name: 'Lake Pukaki观景台', tip: 'Visitor Centre停车，拍奶蓝色湖水+Aoraki雪山', image: 'https://loremflickr.com/300/200/lake-pukaki-view' }], restaurants: [{ name: 'Kohan Japanese', dish: '三文鱼donburi', price: '$25', tip: 'Tekapo唯一日料，湖景位要提前到', image: 'https://loremflickr.com/300/200/kohan-tekapo' }, { name: 'Dark Sky Diner', dish: '星空主题鸡尾酒+羊肉', price: '$35', tip: '观星后直接来吃，Deep South冰淇淋必点', image: 'https://loremflickr.com/300/200/dark-sky-diner' }] },
          { day: 3, locations: ['mt-cook'], activities: ['Hooker Valley Track', 'Tasman Glacier直升机+冰川徒步($450)', 'The Hermitage下午茶'], transport: '自驾', meals: '午餐Old Mountaineers Cafe 晚餐The Hermitage', accommodation: 'The Hermitage Hotel ($400)', morningNote: '7:00 出发Hooker Valley Track（早走人少光线好，全程3小时往返10km平坦） → 经过三座吊桥，第二座是最佳机位（吊桥+Aoraki雪山背景） → 终点冰川湖可以看到 icebergs → 10:30 返回', afternoonNote: '12:00 Old Mountaineers Cafe午餐（Mt Cook burger$22，窗景直接看雪山！）→ 14:00 直升机冰川徒步check-in（$450含装备，飞15分钟到冰川+冰上徒步2小时+钻蓝冰洞） → 16:30 返回 → The Hermitage下午茶（$25 high tea看雪山）', eveningNote: '19:00 The Hermitage Alpine餐厅晚餐（High Country buffet$65，靠窗位看Aoraki日落需提前订） → 21:00 酒店观星（库克山也是暗夜保护区，肉眼银河不输Tekapo）', weatherTip: '直升机冰川徒步受天气影响大，云太低会取消。建议留备选方案（改走Tasman Glacier View步道免费）', costBreakdown: { 住宿: 400, 交通: 40, 餐饮: 130, 门票: 0, 活动: 450 }, photoSpots: [{ name: 'Hooker Valley步道', tip: '第二座吊桥是最佳机位，吊桥+Aoraki雪山', image: 'https://loremflickr.com/300/200/hooker-valley-bridge' }], restaurants: [{ name: 'Old Mountaineers Cafe', dish: 'Mt Cook burger+热巧克力', price: '$22', tip: '库克山脚下最暖和的午餐点，窗景一流', image: 'https://loremflickr.com/300/200/old-mountaineers' }] },
          { day: 4, locations: ['christchurch'], activities: ['Akaroa一日游 海豚巡游', '法式小镇漫步'], transport: '自驾(1.5h单程)', meals: '午餐Akaroa Fish&Chips 晚餐Christchurch', accommodation: 'The Observatory Hotel ($250)', morningNote: '8:00 Mt Cook出发返回基督城（4小时，经Lake Pukaki和Tekapo再补几张照片）→ 12:00 基督城放行李 → 12:30 出发去Akaroa（1.5小时，山路弯多慢开）', afternoonNote: '14:00 Akaroa海豚巡游（$85/2小时，看Hector\'s Dolphin最小海豚只有1.4米长！夏天还能下水同游） → 16:30 法式小镇漫步（Akaroa是新西兰唯一的法国殖民地遗址，彩色小屋+码头+沙滩）', eveningNote: '18:00 Akaroa Fish&Chips（码头边网红店，炸blue cod$14配海景）→ 19:30 返回基督城 → 21:00 晚餐Christchurch市区自由选择 → 结束中线之旅', weatherTip: 'Akaroa比基督城凉，海上风大带防风外套。海豚巡游浪大可能晕船，提前吃晕船药', costBreakdown: { 住宿: 250, 交通: 30, 餐饮: 90, 门票: 0, 活动: 85 } }
        ]),
        totalBudgetMin: 2900, totalBudgetMax: 3600
      }
    ]
  })

  // ── Route 3: 南岛经典环线 (7-10天) ──
  const r3 = await prisma.route.create({
    data: {
      title: '南岛经典环线',
      slug: 'south-island-classic-loop',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/south-island,new-zealand,mountains,lake',
      description: '基督城出发，经Tekapo、Wanaka、皇后镇、Milford Sound的南岛最经典环线',
      bestSeason: JSON.stringify(['summer', 'autumn']),
      typeTags: JSON.stringify(['自驾公路', '自然徒步', '冰川湖泊', '极限运动']),
      featuredOrder: 3,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r3.id, destinationId: christchurch.id, dayIndex: 1 },
      { routeId: r3.id, destinationId: tekapo.id, dayIndex: 2 },
      { routeId: r3.id, destinationId: mtCook.id, dayIndex: 3 },
      { routeId: r3.id, destinationId: wanaka.id, dayIndex: 4 },
      { routeId: r3.id, destinationId: queenstown.id, dayIndex: 5 },
      { routeId: r3.id, destinationId: milford.id, dayIndex: 6 },
      { routeId: r3.id, destinationId: christchurch.id, dayIndex: 7 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r3.id, duration: '7-10天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['christchurch'], activities: ['抵达基督城', '取车', 'Botanical Gardens', '纸板教堂', 'Riverside Market'], transport: '租车取车', meals: '晚餐Riverside Market', accommodation: 'The Observatory Hotel ($250)', costBreakdown: { 住宿: 250, 交通: 80, 餐饮: 60, 门票: 0, 活动: 0 } },
          { day: 2, locations: ['christchurch', 'tekapo'], activities: ['SH8公路(3h)', '好牧人教堂', 'Tekapo Springs', '夜间观星'], transport: '自驾', meals: '午餐Fairlie Bakehouse 晚餐Dark Sky Diner', accommodation: 'Peppers Bluewater ($300)', costBreakdown: { 住宿: 300, 交通: 40, 餐饮: 80, 门票: 0, 活动: 110 }, photoSpots: [{ name: 'Tekapo Springs', tip: '温泉池里朝湖方向拍日落+雪山', image: 'https://loremflickr.com/300/200/tekapo-springs' }] },
          { day: 3, locations: ['tekapo', 'mt-cook'], activities: ['Lake Pukaki观景', 'Hooker Valley Track(3h)', 'Tasman Glacier View'], transport: '自驾(1.5h)', meals: '午餐自备 晚餐The Hermitage', accommodation: 'The Hermitage ($400)', costBreakdown: { 住宿: 400, 交通: 20, 餐饮: 80, 门票: 0, 活动: 0 }, restaurants: [{ name: 'The Hermitage Alpine', dish: 'High Country buffet', price: '$65', tip: '晚餐必须预订，靠窗位看Aoraki日落', image: 'https://loremflickr.com/300/200/hermitage-restaurant' }] },
          { day: 4, locations: ['mt-cook', 'wanaka'], activities: ['Lindis Pass', '孤独的树', 'That Wanaka Tree日落', 'Puzzling World'], transport: '自驾(2.5h)', meals: '午餐Omarama 晚餐Kika', accommodation: 'Edgewater ($280)', costBreakdown: { 住宿: 280, 交通: 30, 餐饮: 90, 门票: 25, 活动: 0 }, photoSpots: [{ name: 'Lindis Pass', tip: '最高点停车，拍金色草甸+蜿蜒公路', image: 'https://loremflickr.com/300/200/lindis-pass-highway' }], restaurants: [{ name: 'Kika', dish: 'lamb shoulder sharing', price: '$42', tip: '一定要点现烤focaccia配dukkah', image: 'https://loremflickr.com/300/200/kika-dish' }] },
          { day: 5, locations: ['wanaka', 'queenstown'], activities: ['Crown Range公路', 'Arrowtown', 'Skyline缆车+晚餐'], transport: '自驾(1h)', meals: '午餐Arrowtown 晚餐Skyline自助', accommodation: 'Novotel Lakeside ($250)', costBreakdown: { 住宿: 250, 交通: 15, 餐饮: 110, 门票: 59, 活动: 0 }, photoSpots: [{ name: 'Arrowtown白金汉街', tip: '秋天4月底最美，金黄落叶+彩色小屋+远山', image: 'https://loremflickr.com/300/200/arrowtown-buckingham' }], restaurants: [{ name: 'Fergburger', dish: 'Big Al双层牛肉堡', price: '$15', tip: '晚上11点后去几乎不用排队', image: 'https://loremflickr.com/300/200/fergburger-night' }, { name: 'Skyline自助', dish: '海鲜青口+甜点pavlova', price: '$59含缆车', tip: '日落时段最抢手，提前2周订位', image: 'https://loremflickr.com/300/200/skyline-buffet' }] },
          { day: 6, locations: ['queenstown', 'milford-sound'], activities: ['Milford Sound一日游', '游船(含午餐)', '镜湖+荷马隧道'], transport: '一日游巴士', meals: '含船上午餐 晚餐皇后镇', accommodation: 'Novotel Lakeside ($250)', costBreakdown: { 住宿: 250, 交通: 0, 餐饮: 50, 门票: 0, 活动: 180 }, photoSpots: [{ name: 'Milford Sound游船甲板', tip: '船头最前面，下雨天瀑布最壮观，广角拍Mitre Peak', image: 'https://loremflickr.com/300/200/milford-sound-boat' }, { name: '镜湖', tip: '清晨无风时倒影最完美，木栈道走到最里面', image: 'https://loremflickr.com/300/200/mirror-lakes-nz' }] },
          { day: 7, locations: ['queenstown', 'christchurch'], activities: ['皇后镇上午自由活动', '还车', '飞回基督城或继续行程'], transport: '自驾(6h)或飞机', meals: '午餐途中 晚餐基督城', accommodation: '', costBreakdown: { 住宿: 0, 交通: 60, 餐饮: 60, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 3500, totalBudgetMax: 4500
      }
    ]
  })

  // ── Route 4: 北岛探索 (7-10天) ──
  const r4 = await prisma.route.create({
    data: {
      title: '北岛探索之旅',
      slug: 'north-island-explorer',
      region: '北岛',
      coverImage: 'https://loremflickr.com/640/480/south-island,new-zealand,mountains,lake',
      description: '从奥克兰出发，霍比屯、地热奇观、火山徒步，北岛精华一网打尽',
      bestSeason: JSON.stringify(['summer', 'autumn', 'spring']),
      typeTags: JSON.stringify(['自驾公路', '霍比屯人文', '自然徒步', '极限运动']),
      featuredOrder: 4,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r4.id, destinationId: auckland.id, dayIndex: 1 },
      { routeId: r4.id, destinationId: hobbiton.id, dayIndex: 2 },
      { routeId: r4.id, destinationId: rotorua.id, dayIndex: 3 },
      { routeId: r4.id, destinationId: tongariro.id, dayIndex: 4 },
      { routeId: r4.id, destinationId: auckland.id, dayIndex: 7 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r4.id, duration: '7-10天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['auckland'], activities: ['抵达奥克兰', '天空塔', 'Viaduct Harbour', 'Waiheke岛品酒(可选)'], transport: '市内Uber+渡轮', meals: '晚餐Depot Eatery', accommodation: 'SO/ Auckland ($280)', costBreakdown: { 住宿: 280, 交通: 50, 餐饮: 80, 门票: 35, 活动: 0 } },
          { day: 2, locations: ['auckland', 'hobbiton'], activities: ['Waitomo萤火虫洞(上午)', '霍比屯电影布景游(下午)', 'Green Dragon Inn饮酒'], transport: '自驾(2h+1h)', meals: '午餐Waitomo Cafe 晚餐霍比屯', accommodation: 'Ramada Rotorua ($180)', costBreakdown: { 住宿: 180, 交通: 30, 餐饮: 70, 门票: 55, 活动: 155 } },
          { day: 3, locations: ['rotorua'], activities: ['Wai-O-Tapu地热公园', 'Te Puia毛利文化村', 'Polynesian Spa温泉'], transport: '自驾', meals: '午餐Eat Street 晚餐毛利Hangi自助', accommodation: 'Ramada Rotorua ($180)', costBreakdown: { 住宿: 180, 交通: 20, 餐饮: 100, 门票: 35, 活动: 125 } },
          { day: 4, locations: ['rotorua', 'tongariro'], activities: ['Huka Falls', 'Lake Taupo', '下午到达Tongariro'], transport: '自驾(2h+1.5h)', meals: '午餐Taupo湖边 晚餐国家公园村', accommodation: 'Chateau Tongariro ($250)', costBreakdown: { 住宿: 250, 交通: 30, 餐饮: 70, 门票: 0, 活动: 0 } },
          { day: 5, locations: ['tongariro'], activities: ['Tongariro Alpine Crossing全天徒步(19.4km 7-9h)', '翡翠湖+火山口'], transport: '景区接驳车', meals: '自备路餐 晚餐Chateau', accommodation: 'Chateau Tongariro ($250)', costBreakdown: { 住宿: 250, 交通: 45, 餐饮: 40, 门票: 0, 活动: 0 } },
          { day: 6, locations: ['tongariro', 'auckland'], activities: ['上午休息or短途步道', '下午驾车返回奥克兰(4.5h)'], transport: '自驾', meals: '午餐Taupo 晚餐奥克兰', accommodation: 'SO/ Auckland ($280)', costBreakdown: { 住宿: 280, 交通: 40, 餐饮: 70, 门票: 0, 活动: 0 } },
          { day: 7, locations: ['auckland'], activities: ['Ponsonby早午餐', 'Devonport', 'Mount Eden', '自由购物'], transport: 'Uber+渡轮', meals: '午餐Ponsonby Central 晚餐随意', accommodation: '', costBreakdown: { 住宿: 0, 交通: 40, 餐饮: 80, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 3000, totalBudgetMax: 3800
      }
    ]
  })

  // ── New Destination: Te Anau ──
  const teAnau = await prisma.destination.create({
    data: {
      name: '蒂阿瑙', slug: 'te-anau', region: '南岛',
      coordinates: '-45.4149,167.7167',
      coverImage: 'https://loremflickr.com/640/480/te-anau,lake,fiordland,new-zealand',
      description: '峡湾国家公园门户，南岛最大湖泊，萤火虫洞所在',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '全年，夏季日照长适合徒步，冬季安静',
        ticketPrice: '萤火虫洞$75，Milford Sound游船$65起',
        transport: '从皇后镇自驾2小时，也是Milford Sound必经之路',
        stayDuration: '建议1-2晚',
        nearbySpots: [{ name: '米尔福德峡湾', distance: '2小时车程', slug: 'milford-sound' }, { name: '皇后镇', distance: '2小时车程', slug: 'queenstown' }],
        accommodation: 'Distinction$220起，Holiday Park$42起',
        xhsTags: ['蒂阿瑙攻略', '萤火虫洞', 'Fiordland']
      })
    }
  })

  // ── New Destinations for expanded routes ──

  const franzJosef = await prisma.destination.create({
    data: {
      name: '弗朗兹约瑟夫冰川', slug: 'franz-josef', region: '南岛',
      coordinates: '-43.3882,170.1818',
      coverImage: 'https://loremflickr.com/640/480/franz-josef-glacier,new-zealand,ice',
      description: '西海岸最易到达的冰川，直升机能直接上冰面徒步',
      type: 'natural_attraction',
      practicalInfo: JSON.stringify({
        bestSeason: '全年，夏季冰川更稳定，冬季雪景壮观',
        ticketPrice: '冰川直升机徒步$450起，冰川谷步道免费',
        transport: '从皇后镇自驾5小时或从基督城经Arthur\'s Pass',
        stayDuration: '建议1晚',
        nearbySpots: [{ name: 'Fox冰川', distance: '30分钟车程', slug: 'fox-glacier' }],
        accommodation: 'Rainforest Retreat$60起，Scenic Hotel$180起',
        xhsTags: ['Franz Josef冰川', '新西兰冰川徒步', '西海岸']
      })
    }
  })

  const foxGlacier = await prisma.destination.create({
    data: {
      name: '福克斯冰川', slug: 'fox-glacier', region: '南岛',
      coordinates: '-43.4645,170.0175',
      coverImage: 'https://loremflickr.com/640/480/fox-glacier,new-zealand,west-coast',
      description: '比Franz Josef更安静，Lake Matheson倒影绝美',
      type: 'natural_attraction',
      practicalInfo: JSON.stringify({
        bestSeason: '全年，Lake Matheson清晨无风时倒影最完美',
        ticketPrice: '冰川直升机$450起，Lake Matheson步道免费',
        transport: '从Franz Josef自驾30分钟',
        stayDuration: '建议半天到1晚',
        nearbySpots: [{ name: 'Franz Josef', distance: '30分钟车程', slug: 'franz-josef' }],
        accommodation: 'Fox Glacier Lodge$120起',
        xhsTags: ['Fox冰川', 'Lake Matheson', '新西兰西海岸']
      })
    }
  })

  const hokitika = await prisma.destination.create({
    data: {
      name: '霍基蒂卡', slug: 'hokitika', region: '南岛',
      coordinates: '-42.7195,170.9631',
      coverImage: 'https://loremflickr.com/640/480/hokitika,new-zealand,gorge',
      description: '西海岸文艺小镇，Hokitika Gorge奶蓝河水+萤火虫谷',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '春夏最佳，河水最蓝',
        ticketPrice: 'Hokitika Gorge免费，萤火虫谷免费',
        transport: '从基督城经Arthur\'s Pass自驾3.5小时',
        stayDuration: '建议半天到1晚',
        nearbySpots: [{ name: 'Franz Josef', distance: '2小时车程', slug: 'franz-josef' }],
        accommodation: 'Beachfront Hotel$130起',
        xhsTags: ['Hokitika Gorge', '新西兰西海岸', '萤火虫']
      })
    }
  })

  const kaikoura = await prisma.destination.create({
    data: {
      name: '凯库拉', slug: 'kaikoura', region: '南岛',
      coordinates: '-42.4008,173.6815',
      coverImage: 'https://loremflickr.com/640/480/kaikoura,new-zealand,whale',
      description: '雪山与大海相遇之地，观鲸+海豚+海豹的天堂',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '全年，夏季观鲸概率更高，冬季雪山背景更壮观',
        ticketPrice: '观鲸$150，海豚同游$190，半岛步道免费',
        transport: '从基督城自驾2.5小时，或乘Coastal Pacific火车',
        stayDuration: '建议1-2晚',
        nearbySpots: [{ name: '基督城', distance: '2.5小时车程', slug: 'christchurch' }],
        accommodation: 'Dusky Lodge$35起，The White Morph$200起',
        xhsTags: ['凯库拉攻略', '新西兰观鲸', '海豚同游']
      })
    }
  })

  const blenheim = await prisma.destination.create({
    data: {
      name: '布伦海姆', slug: 'blenheim', region: '南岛',
      coordinates: '-41.5134,173.9612',
      coverImage: 'https://loremflickr.com/640/480/marlborough,new-zealand,vineyard',
      description: '马尔堡葡萄酒产区中心，Sauvignon Blanc之乡',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '夏季12-2月葡萄成熟，秋季颜色最美',
        ticketPrice: '酒庄品酒$5-20/家，自行车租赁$40/天',
        transport: '从基督城自驾4小时或飞Blenheim机场',
        stayDuration: '建议1-2晚',
        nearbySpots: [{ name: 'Picton', distance: '30分钟车程', slug: 'blenheim' }],
        accommodation: 'Vintners Retreat$250起，YHA$35起',
        xhsTags: ['马尔堡酒庄', '新西兰葡萄酒', 'Sauvignon Blanc']
      })
    }
  })

  const paihia = await prisma.destination.create({
    data: {
      name: '派希亚', slug: 'paihia', region: '北岛',
      coordinates: '-35.2820,174.0912',
      coverImage: 'https://loremflickr.com/640/480/bay-of-islands,new-zealand,boat',
      description: '岛屿湾门户，144个岛屿的天空之境，海豚+历史+海滩',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '夏季12-3月最佳，海水温暖适合水上活动',
        ticketPrice: '岛屿湾游船$120，Russell渡轮$14往返',
        transport: '从奥克兰自驾3小时',
        stayDuration: '建议2-3晚',
        nearbySpots: [{ name: 'Cape Reinga', distance: '3小时车程', slug: 'cape-reinga' }],
        accommodation: 'Paihia Beach Resort$200起，YHA$38起',
        xhsTags: ['岛屿湾攻略', '新西兰北地', '海豚巡游']
      })
    }
  })

  const capeReinga = await prisma.destination.create({
    data: {
      name: '雷因格海角', slug: 'cape-reinga', region: '北岛',
      coordinates: '-34.4293,172.6806',
      coverImage: 'https://loremflickr.com/640/480/cape-reinga,new-zealand,lighthouse',
      description: '新西兰最北端灯塔，塔斯曼海与太平洋交汇处',
      type: 'natural_attraction',
      practicalInfo: JSON.stringify({
        bestSeason: '全年，晴天最佳看两海交汇',
        ticketPrice: '免费，九十英里海滩巴士游$60',
        transport: '从Paihia自驾3小时或参加一日游',
        stayDuration: '建议从Paihia一日游',
        nearbySpots: [{ name: '派希亚', distance: '3小时车程', slug: 'paihia' }],
        accommodation: '多在Paihia住宿',
        xhsTags: ['Cape Reinga', '新西兰最北端', '九十英里海滩']
      })
    }
  })

  const cromwell = await prisma.destination.create({
    data: {
      name: '克伦威尔', slug: 'cromwell', region: '南岛',
      coordinates: '-45.0400,169.2001',
      coverImage: 'https://loremflickr.com/640/480/cromwell,new-zealand,orchard',
      description: '中奥塔哥水果之乡，樱桃+酒庄+历史金矿小镇',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '夏季12-1月樱桃季，秋天颜色最美',
        ticketPrice: '樱桃采摘$10-20/kg，酒庄品酒$5-15',
        transport: '从皇后镇自驾45分钟经Kawarau Gorge',
        stayDuration: '建议半天到1天',
        nearbySpots: [{ name: '皇后镇', distance: '45分钟车程', slug: 'queenstown' }, { name: '瓦纳卡', distance: '30分钟车程', slug: 'wanaka' }],
        accommodation: 'Heritage Boutique$180起，多在皇后镇或瓦纳卡住宿',
        xhsTags: ['克伦威尔攻略', '新西兰樱桃', '中奥塔哥']
      })
    }
  })

  const bluff = await prisma.destination.create({
    data: {
      name: '布拉夫', slug: 'bluff', region: '南岛',
      coordinates: '-46.5988,168.3444',
      coverImage: 'https://loremflickr.com/640/480/bluff,new-zealand,oyster',
      description: '南岛最南端，世界级生蚝产地，Stirling Point标志牌',
      type: 'city',
      practicalInfo: JSON.stringify({
        bestSeason: '3-8月生蚝季，5月Bluff Oyster Festival',
        ticketPrice: '生蚝$25/打，Stirling Point免费',
        transport: '从Invercargill自驾30分钟',
        stayDuration: '建议半天',
        nearbySpots: [{ name: '皇后镇', distance: '2.5小时车程', slug: 'queenstown' }],
        accommodation: '多在Invercargill住宿',
        xhsTags: ['布拉夫生蚝', '新西兰最南端', 'Stirling Point']
      })
    }
  })

  // ── Route 6: 皇后镇冬日滑雪 (3-5天) ──
  const r6 = await prisma.route.create({
    data: {
      title: '皇后镇冬日滑雪之旅',
      slug: 'queenstown-winter-ski',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/queenstown,ski,snow,cardrona',
      description: '南半球最顶级滑雪体验，Cardrona+Remarkables双雪场，配温泉解乏',
      bestSeason: JSON.stringify(['winter']),
      typeTags: JSON.stringify(['滑雪', '极限运动', '冰川湖泊']),
      featuredOrder: 6,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r6.id, destinationId: queenstown.id, dayIndex: 1 },
      { routeId: r6.id, destinationId: wanaka.id, dayIndex: 2 },
      { routeId: r6.id, destinationId: queenstown.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r6.id, duration: '3-5天', budgetLevel: '穷游',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown'], activities: ['抵达皇后镇', '租雪具', 'Remarkables雪场半天热身'], transport: '机场巴士+雪场接驳', meals: '午餐Fergburger 晚餐自炊', accommodation: 'YHA Queenstown ($35)', costBreakdown: { 住宿: 35, 交通: 25, 餐饮: 40, 门票: 0, 活动: 130 } },
          { day: 2, locations: ['wanaka'], activities: ['Cardrona Alpine Resort全天滑雪', 'Wanaka湖畔'], transport: '雪场接驳巴士', meals: '雪场午餐 晚餐Wanaka', accommodation: 'Wanaka YHA ($38)', costBreakdown: { 住宿: 38, 交通: 35, 餐饮: 50, 门票: 0, 活动: 140 } },
          { day: 3, locations: ['queenstown'], activities: ['Coronet Peak上午滑雪', 'Onsen Hot Pools泡温泉', '晚间航班离开'], transport: '雪场接驳', meals: '雪场午餐 晚餐皇后镇', accommodation: '', costBreakdown: { 住宿: 0, 交通: 35, 餐饮: 50, 门票: 0, 活动: 155 } }
        ]),
        totalBudgetMin: 750, totalBudgetMax: 950
      },
      {
        routeId: r6.id, duration: '3-5天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown'], activities: ['抵达皇后镇', 'Skyline Gondola+赏雪景', '镇上精品雪具店fitting', '晚餐Rata'], transport: '机场接送+步行', meals: '午餐Bespoke 晚餐Rata', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 40, 餐饮: 110, 门票: 59, 活动: 0 } },
          { day: 2, locations: ['wanaka'], activities: ['Cardrona全天滑雪', '私教课2小时', 'Wanaka湖畔下午茶'], transport: '自驾四驱车', meals: '雪场餐厅 晚餐Kika', accommodation: 'Edgewater ($280)', costBreakdown: { 住宿: 280, 交通: 30, 餐饮: 100, 门票: 0, 活动: 320 } },
          { day: 3, locations: ['queenstown'], activities: ['Remarkables全天滑雪', 'Onsen Hot Pools日落私汤', 'Skyline自助晚餐'], transport: '自驾四驱车', meals: '雪场午餐 晚餐Skyline自助', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 30, 餐饮: 100, 门票: 59, 活动: 200 } },
          { day: 4, locations: ['queenstown'], activities: ['Coronet Peak上午', '下午自由活动or Shotover Jet', '晚餐Flame'], transport: '自驾', meals: '雪场午餐 晚餐Flame', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 30, 餐饮: 100, 门票: 0, 活动: 150 } },
          { day: 5, locations: ['queenstown'], activities: ['最后半天滑雪or休息', 'Kiwi Birdlife Park', '离境'], transport: '自驾+机场', meals: '午餐Fergburger 晚餐飞机上', accommodation: '', costBreakdown: { 住宿: 0, 交通: 30, 餐饮: 40, 门票: 50, 活动: 0 } }
        ]),
        totalBudgetMin: 2800, totalBudgetMax: 3600
      }
    ]
  })

  // ── Route 7: 峡湾深度探索 (3-5天) ──
  const r7 = await prisma.route.create({
    data: {
      title: '峡湾深度探索',
      slug: 'fiordland-explorer',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/milford-sound,fiordland,waterfalls',
      description: '深入峡湾国家公园，Milford Sound游船+Te Anau萤火虫洞+世界级徒步',
      bestSeason: JSON.stringify(['summer', 'autumn', 'spring']),
      typeTags: JSON.stringify(['自然徒步', '冰川湖泊', '自驾公路']),
      featuredOrder: 7,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r7.id, destinationId: queenstown.id, dayIndex: 1 },
      { routeId: r7.id, destinationId: teAnau.id, dayIndex: 2 },
      { routeId: r7.id, destinationId: milford.id, dayIndex: 3 },
      { routeId: r7.id, destinationId: queenstown.id, dayIndex: 4 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r7.id, duration: '3-5天', budgetLevel: '穷游',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown', 'te-anau'], activities: ['皇后镇出发自驾至Te Anau(2h)', 'Te Anau湖畔散步', 'Te Anau萤火虫洞(傍晚团)'], transport: '自驾', meals: '午餐Te Anau 晚餐自炊', accommodation: 'Te Anau Lakeview Holiday Park ($42)', costBreakdown: { 住宿: 42, 交通: 20, 餐饮: 35, 门票: 0, 活动: 75 } },
          { day: 2, locations: ['milford-sound', 'te-anau'], activities: ['Milford Sound游船（bookme特价票）', '镜湖+荷马隧道+The Chasm', '返回Te Anau'], transport: '自驾(2h单程)', meals: '游船含午餐 晚餐Te Anau', accommodation: 'Te Anau Lakeview Holiday Park ($42)', costBreakdown: { 住宿: 42, 交通: 25, 餐饮: 30, 门票: 0, 活动: 65 } },
          { day: 3, locations: ['te-anau', 'queenstown'], activities: ['Kepler Track短途徒步(可选)', '或Lake Manapouri', '返回皇后镇'], transport: '自驾(2h)', meals: '午餐Te Anau 晚餐皇后镇', accommodation: 'YHA Queenstown ($35)', costBreakdown: { 住宿: 35, 交通: 20, 餐饮: 35, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 480, totalBudgetMax: 650
      },
      {
        routeId: r7.id, duration: '3-5天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown', 'te-anau'], activities: ['自驾至Te Anau', 'Te Anau湖畔cafe午餐', 'Te Anau Glowworm Caves', 'Fiordland Cinema看Ata Whenua'], transport: '自驾', meals: '午餐Sandfly Cafe 晚餐Redcliff Cafe', accommodation: 'Distinction Te Anau ($220)', costBreakdown: { 住宿: 220, 交通: 20, 餐饮: 90, 门票: 0, 活动: 90 } },
          { day: 2, locations: ['milford-sound', 'te-anau'], activities: ['Milford Sound精品游船+水下观测站', '镜湖+荷马隧道', 'The Chasm步道'], transport: '自驾', meals: '游船含自助午餐 晚餐酒店', accommodation: 'Distinction Te Anau ($220)', costBreakdown: { 住宿: 220, 交通: 25, 餐饮: 60, 门票: 0, 活动: 140 } },
          { day: 3, locations: ['te-anau', 'queenstown'], activities: ['Kepler Track直升机+徒步(半天)', '或Kayak游览Lake Manapouri', '返回皇后镇'], transport: '自驾', meals: '午餐Te Anau 晚餐皇后镇', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 20, 餐饮: 90, 门票: 0, 活动: 350 } },
          { day: 4, locations: ['queenstown'], activities: ['Milford Sound小飞机观光($395/人)', '皇后镇自由活动', '品酒orSPA'], transport: '小飞机+步行', meals: '午餐皇后镇 晚餐The Grille', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 0, 餐饮: 100, 门票: 0, 活动: 395 } }
        ]),
        totalBudgetMin: 2400, totalBudgetMax: 3200
      }
    ]
  })

  // ── Route 8: 西海岸冰川探险 (3-5天) ──
  const r8 = await prisma.route.create({
    data: {
      title: '西海岸冰川探险',
      slug: 'west-coast-glaciers',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/franz-josef-glacier,heli-hike',
      description: '穿越Arthur\'s Pass到狂野西海岸，直升机冰川徒步+奶蓝河谷+萤火虫',
      bestSeason: JSON.stringify(['summer', 'autumn', 'spring']),
      typeTags: JSON.stringify(['冰川湖泊', '自然徒步', '自驾公路']),
      featuredOrder: 8,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r8.id, destinationId: christchurch.id, dayIndex: 1 },
      { routeId: r8.id, destinationId: hokitika.id, dayIndex: 2 },
      { routeId: r8.id, destinationId: franzJosef.id, dayIndex: 3 },
      { routeId: r8.id, destinationId: foxGlacier.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [{
      routeId: r8.id, duration: '3-5天', budgetLevel: '舒适',
      itinerary: JSON.stringify([
        { day: 1, locations: ['christchurch'], activities: ['基督城出发经Arthur\'s Pass', 'Castle Hill巨石阵', 'Arthur\'s Pass国家公园短途步道', '抵达Hokitika'], transport: '自驾(3.5h)', meals: '午餐Arthur\'s Pass Cafe 晚餐Hokitika', accommodation: 'Beachfront Hotel ($140)', costBreakdown: { 住宿: 140, 交通: 30, 餐饮: 60, 门票: 0, 活动: 0 } },
        { day: 2, locations: ['hokitika', 'franz-josef'], activities: ['Hokitika Gorge奶蓝河步道', '西海岸公路(2h)', 'Franz Josef小镇', 'Glacier Hot Pools泡温泉'], transport: '自驾(2h)', meals: '午餐Hokitika 晚餐Alice May', accommodation: 'Rainforest Retreat ($120)', costBreakdown: { 住宿: 120, 交通: 25, 餐饮: 70, 门票: 0, 活动: 35 } },
        { day: 3, locations: ['franz-josef', 'fox-glacier'], activities: ['直升机冰川徒步($450)', 'Lake Matheson环湖步道', 'Fox Glacier观景台', '返回基督城或继续南下'], transport: '自驾', meals: '午餐Franz Josef 晚餐途中', accommodation: '', costBreakdown: { 住宿: 0, 交通: 30, 餐饮: 60, 门票: 0, 活动: 450 } }
      ]),
      totalBudgetMin: 850, totalBudgetMax: 1100
    }]
  })

  // ── Route 9: 凯库拉马尔堡 (3-5天) ──
  const r9 = await prisma.route.create({
    data: {
      title: '凯库拉观鲸+马尔堡酒庄',
      slug: 'kaikoura-marlborough',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/kaikoura,whale,new-zealand',
      description: '观鲸+海豚同游+酒庄品酒，南岛北端的极致生态与美食体验',
      bestSeason: JSON.stringify(['summer', 'autumn', 'spring']),
      typeTags: JSON.stringify(['自驾公路', '自然徒步', '极限运动']),
      featuredOrder: 9,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r9.id, destinationId: christchurch.id, dayIndex: 1 },
      { routeId: r9.id, destinationId: kaikoura.id, dayIndex: 2 },
      { routeId: r9.id, destinationId: blenheim.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [{
      routeId: r9.id, duration: '3-5天', budgetLevel: '舒适',
      itinerary: JSON.stringify([
        { day: 1, locations: ['christchurch'], activities: ['基督城出发沿海岸线北上', 'Waipara葡萄酒区短暂品酒', '抵达Kaikoura', '半岛步道看海豹+日落'], transport: '自驾(2.5h)', meals: '午餐Waipara 晚餐Kaikoura海鲜', accommodation: 'The White Morph ($200)', costBreakdown: { 住宿: 200, 交通: 20, 餐饮: 80, 门票: 0, 活动: 0 } },
        { day: 2, locations: ['kaikoura'], activities: ['晨间观鲸之旅($150)', '午餐龙虾餐车', 'Kaikoura Peninsula Walkway', '可选海豚同游($190)'], transport: '步行+观鲸船', meals: '午餐Nin\'s Bin龙虾 晚餐Green Dolphin', accommodation: 'The White Morph ($200)', costBreakdown: { 住宿: 200, 交通: 0, 餐饮: 100, 门票: 0, 活动: 340 } },
        { day: 3, locations: ['kaikoura', 'blenheim'], activities: ['沿海公路北上(1.5h)', 'Marlborough酒庄自行车巡游', 'Wither Hills品酒+午餐', '返回基督城(4h)或飞离Blenheim'], transport: '自驾+自行车', meals: '午餐Wither Hills酒庄 晚餐途中', accommodation: '', costBreakdown: { 住宿: 0, 交通: 30, 餐饮: 100, 门票: 0, 活动: 50 } }
      ]),
      totalBudgetMin: 1000, totalBudgetMax: 1300
    }]
  })

  // ── Route 10: 岛屿湾北地之旅 (3-5天) ──
  const r10 = await prisma.route.create({
    data: {
      title: '岛屿湾北地之旅',
      slug: 'bay-of-islands-northland',
      region: '北岛',
      coverImage: 'https://loremflickr.com/640/480/bay-of-islands,new-zealand,sailing',
      description: '奥克兰北上，144个岛屿的碧蓝海湾+Cape Reinga最北灯塔+九十英里海滩',
      bestSeason: JSON.stringify(['summer', 'autumn']),
      typeTags: JSON.stringify(['自驾公路', '极限运动', '自然徒步']),
      featuredOrder: 10,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r10.id, destinationId: auckland.id, dayIndex: 1 },
      { routeId: r10.id, destinationId: paihia.id, dayIndex: 2 },
      { routeId: r10.id, destinationId: capeReinga.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [{
      routeId: r10.id, duration: '3-5天', budgetLevel: '舒适',
      itinerary: JSON.stringify([
        { day: 1, locations: ['auckland', 'paihia'], activities: ['奥克兰出发北上(3h)', 'Whangarei Falls中途停留', '抵达Paihia', '傍晚海边散步+Russell渡轮'], transport: '自驾(3h)', meals: '午餐Whangarei 晚餐Paihia码头', accommodation: 'Paihia Beach Resort ($200)', costBreakdown: { 住宿: 200, 交通: 25, 餐饮: 70, 门票: 0, 活动: 14 } },
        { day: 2, locations: ['paihia'], activities: ['岛屿湾游船探洞($120)', '海豚巡游', 'Urupukapuka岛浮潜', 'Russell历史小镇'], transport: '游船+渡轮', meals: '午餐游船 晚餐Russell', accommodation: 'Paihia Beach Resort ($200)', costBreakdown: { 住宿: 200, 交通: 0, 餐饮: 80, 门票: 0, 活动: 120 } },
        { day: 3, locations: ['paihia', 'cape-reinga'], activities: ['Cape Reinga一日游($60)', '九十英里海滩巴士冲沙', 'Te Paki沙丘滑沙', '返回奥克兰(3h)或继续探索'], transport: '一日游巴士+自驾', meals: '午餐途中 晚餐奥克兰', accommodation: '', costBreakdown: { 住宿: 0, 交通: 30, 餐饮: 50, 门票: 0, 活动: 60 } }
      ]),
      totalBudgetMin: 900, totalBudgetMax: 1200
    }]
  })

  // ── Route 11: 中奥塔哥美酒水果之旅 (3-5天) ──
  const r11 = await prisma.route.create({
    data: {
      title: '中奥塔哥美酒水果之旅',
      slug: 'central-otago-wine',
      region: '南岛',
      coverImage: 'https://loremflickr.com/640/480/central-otago,new-zealand,vineyard-autumn',
      description: '皇后镇周边深度探索，樱桃采摘+Cromwell酒庄+Kawarua峡谷+布拉夫生蚝',
      bestSeason: JSON.stringify(['summer', 'autumn']),
      typeTags: JSON.stringify(['自驾公路', '霍比屯人文', '自然徒步']),
      featuredOrder: 11,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r11.id, destinationId: queenstown.id, dayIndex: 1 },
      { routeId: r11.id, destinationId: cromwell.id, dayIndex: 2 },
      { routeId: r11.id, destinationId: bluff.id, dayIndex: 3 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [{
      routeId: r11.id, duration: '3-5天', budgetLevel: '舒适',
      itinerary: JSON.stringify([
        { day: 1, locations: ['queenstown'], activities: ['皇后镇出发', 'Kawarau Bridge蹦极观景(不跳也值得看)', 'Gibbston Valley酒庄品酒+午餐', 'Arrowtown黄昏散步'], transport: '自驾', meals: '午餐Gibbston酒庄 晚餐Arrowtown', accommodation: 'Novotel Queenstown ($250)', costBreakdown: { 住宿: 250, 交通: 15, 餐饮: 110, 门票: 0, 活动: 20 } },
        { day: 2, locations: ['queenstown', 'cromwell'], activities: ['Kawarau Gorge公路(45min)', 'Cromwell Heritage Precinct', '樱桃园采摘(夏季)/酒庄品酒', 'Bannockburn酒庄区'], transport: '自驾', meals: '午餐Cromwell 晚餐酒庄餐厅', accommodation: 'Heritage Boutique ($180)', costBreakdown: { 住宿: 180, 交通: 15, 餐饮: 90, 门票: 0, 活动: 30 } },
        { day: 3, locations: ['cromwell', 'bluff'], activities: ['南下至Invercargill(2h)', 'Bluff Stirling Point打卡', '生蚝吧品尝($25/打)', '返回皇后镇或继续南岛探索'], transport: '自驾', meals: '午餐Bluff生蚝 晚餐途中', accommodation: '', costBreakdown: { 住宿: 0, 交通: 35, 餐饮: 60, 门票: 0, 活动: 0 } }
      ]),
      totalBudgetMin: 700, totalBudgetMax: 950
    }]
  })

  // ── Add missing budget variants for existing routes ──
  await prisma.routeVariant.createMany({
    data: [
      // Route 3: 南岛经典环线 穷游版
      {
        routeId: r3.id, duration: '7-10天', budgetLevel: '穷游',
        itinerary: JSON.stringify([
          { day: 1, locations: ['christchurch'], activities: ['抵达基督城', '取经济车', '市区步行'], transport: '租车', meals: '晚餐Riverside Market自选', accommodation: 'Jailhouse Accommodation ($35)', costBreakdown: { 住宿: 35, 交通: 40, 餐饮: 25, 门票: 0, 活动: 0 } },
          { day: 2, locations: ['christchurch', 'tekapo'], activities: ['SH8公路(3h)', '好牧人教堂', 'Lake Tekapo散步', '夜晚免费观星'], transport: '自驾', meals: '午餐Fairlie Bakehouse 晚餐自炊', accommodation: 'Lake Tekapo Holiday Park ($40)', costBreakdown: { 住宿: 40, 交通: 25, 餐饮: 30, 门票: 0, 活动: 0 } },
          { day: 3, locations: ['tekapo', 'mt-cook'], activities: ['Lake Pukaki观景', 'Hooker Valley Track(免费)', 'Tasman Glacier View'], transport: '自驾', meals: '午餐自备三明治 晚餐自炊', accommodation: 'Mt Cook Backpacker Lodge ($45)', costBreakdown: { 住宿: 45, 交通: 15, 餐饮: 20, 门票: 0, 活动: 0 } },
          { day: 4, locations: ['mt-cook', 'wanaka'], activities: ['Lindis Pass', '孤独的树拍照', '湖边散步'], transport: '自驾(2.5h)', meals: '午餐Omarama 晚餐自炊', accommodation: 'Wanaka YHA ($38)', costBreakdown: { 住宿: 38, 交通: 20, 餐饮: 30, 门票: 0, 活动: 0 } },
          { day: 5, locations: ['wanaka', 'queenstown'], activities: ['Crown Range公路', 'Arrowtown免费散步', '皇后镇湖畔'], transport: '自驾(1h)', meals: '午餐Arrowtown Bakery 晚餐Fergburger', accommodation: 'YHA Queenstown ($35)', costBreakdown: { 住宿: 35, 交通: 15, 餐饮: 40, 门票: 0, 活动: 0 } },
          { day: 6, locations: ['queenstown', 'milford-sound'], activities: ['Milford Sound一日游巴士', '游船(bookme特价)'], transport: '一日游巴士', meals: '自备午餐 晚餐皇后镇', accommodation: 'YHA Queenstown ($35)', costBreakdown: { 住宿: 35, 交通: 0, 餐饮: 15, 门票: 0, 活动: 99 } },
          { day: 7, locations: ['queenstown', 'christchurch'], activities: ['自由上午', '返回基督城'], transport: '自驾(6h)', meals: '午餐途中 晚餐基督城', accommodation: '', costBreakdown: { 住宿: 0, 交通: 40, 餐饮: 30, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 1200, totalBudgetMax: 1800
      },
      // Route 1: 皇后镇奢华版
      {
        routeId: r1.id, duration: '3-5天', budgetLevel: '奢华',
        itinerary: JSON.stringify([
          { day: 1, locations: ['queenstown'], activities: ['机场专车接机', 'Eichardts私人酒店check-in', '直升机Wakatipu盆地观光+冰川着陆($895)', '天空缆车私人包厢晚餐'], transport: '专车+直升机', meals: '午餐酒店 晚餐Skyline私人包厢', accommodation: 'Eichardts Private Hotel ($1200)', costBreakdown: { 住宿: 1200, 交通: 120, 餐饮: 200, 门票: 0, 活动: 895 } },
          { day: 2, locations: ['glenorchy', 'arrowtown'], activities: ['Dart River直升机+快艇+徒步组合($599)', 'Paradise Road私人向导', 'Arrowtown The Winery私人品酒'], transport: '私人向导四驱车', meals: '午餐Glenorchy Lodge 晚餐Amisfield Winery', accommodation: 'Eichardts Private Hotel ($1200)', costBreakdown: { 住宿: 1200, 交通: 80, 餐饮: 250, 门票: 0, 活动: 599 } },
          { day: 3, locations: ['wanaka'], activities: ['Crown Range直升机', 'Wanaka水上飞机+岛屿野餐($450)', 'Roys Peak直升机+山顶香槟'], transport: '直升机+专车', meals: '午餐岛屿野餐 晚餐Kika tasting menu', accommodation: 'Mahu Whenua Wanaka ($1500)', costBreakdown: { 住宿: 1500, 交通: 200, 餐饮: 300, 门票: 0, 活动: 650 } },
          { day: 4, locations: ['queenstown'], activities: ['Nevis蹦极+Shotover Jet', 'Onsen Hot Pools私人SPA', 'Gibbston Valley酒庄晚宴'], transport: '专车', meals: '午餐Amisfield 晚餐Gibbston Valley', accommodation: 'Matakauri Lodge ($1800)', costBreakdown: { 住宿: 1800, 交通: 100, 餐饮: 300, 门票: 0, 活动: 500 } },
          { day: 5, locations: ['queenstown'], activities: ['Ben Lomond直升机+山顶瑜伽', '私人游艇Wakatipu湖巡游', '离境'], transport: '直升机+专车+游艇', meals: '午餐游艇 晚餐飞机上', accommodation: '', costBreakdown: { 住宿: 0, 交通: 200, 餐饮: 150, 门票: 0, 活动: 600 } }
        ]),
        totalBudgetMin: 8500, totalBudgetMax: 12000
      }
    ]
  })
  const r5 = await prisma.route.create({
    data: {
      title: '南北岛大穿越',
      slug: 'nz-grand-traverse',
      region: '跨岛',
      coverImage: 'https://loremflickr.com/640/480/south-island,new-zealand,mountains,lake',
      description: '从南岛基督城一路北上至奥克兰，两周玩遍南北岛精华',
      bestSeason: JSON.stringify(['summer']),
      typeTags: JSON.stringify(['自驾公路', '自然徒步', '冰川湖泊', '霍比屯人文', '极限运动']),
      featuredOrder: 5,
    }
  })

  await prisma.routeDestination.createMany({
    data: [
      { routeId: r5.id, destinationId: christchurch.id, dayIndex: 1 },
      { routeId: r5.id, destinationId: tekapo.id, dayIndex: 2 },
      { routeId: r5.id, destinationId: wanaka.id, dayIndex: 3 },
      { routeId: r5.id, destinationId: queenstown.id, dayIndex: 4 },
      { routeId: r5.id, destinationId: milford.id, dayIndex: 5 },
      { routeId: r5.id, destinationId: rotorua.id, dayIndex: 8 },
      { routeId: r5.id, destinationId: hobbiton.id, dayIndex: 9 },
      { routeId: r5.id, destinationId: auckland.id, dayIndex: 10 },
    ]
  })

  await prisma.routeVariant.createMany({
    data: [
      {
        routeId: r5.id, duration: '10-14天', budgetLevel: '舒适',
        itinerary: JSON.stringify([
          { day: 1, locations: ['christchurch'], activities: ['抵达基督城', '取车', '市区游览'], transport: '租车', meals: '晚餐Riverside Market', accommodation: 'The Observatory Hotel ($250)', costBreakdown: { 住宿: 250, 交通: 80, 餐饮: 60, 门票: 0, 活动: 0 } },
          { day: 2, locations: ['tekapo'], activities: ['SH8公路', '好牧人教堂', '星空'], transport: '自驾(3h)', meals: '午餐Fairlie 晚餐Kohan', accommodation: 'Peppers Bluewater ($300)', costBreakdown: { 住宿: 300, 交通: 40, 餐饮: 80, 门票: 0, 活动: 30 } },
          { day: 3, locations: ['mt-cook', 'wanaka'], activities: ['Hooker Valley徒步', 'Lindis Pass', '孤独的树'], transport: '自驾(1.5h+2.5h)', meals: '午餐Mt Cook 晚餐Wanaka', accommodation: 'Edgewater ($280)', costBreakdown: { 住宿: 280, 交通: 40, 餐饮: 80, 门票: 0, 活动: 0 } },
          { day: 4, locations: ['queenstown'], activities: ['Arrowtown', 'Skyline缆车', 'Bungy/Shotover Jet'], transport: '自驾(1h)', meals: '午餐Arrowtown 晚餐Skyline', accommodation: 'Novotel ($250)', costBreakdown: { 住宿: 250, 交通: 15, 餐饮: 110, 门票: 59, 活动: 200 } },
          { day: 5, locations: ['milford-sound'], activities: ['Milford Sound一日游'], transport: '巴士一日游', meals: '含午餐 晚餐皇后镇', accommodation: 'Novotel ($250)', costBreakdown: { 住宿: 250, 交通: 0, 餐饮: 50, 门票: 0, 活动: 180 } },
          { day: 6, locations: ['queenstown'], activities: ['Glenorchy', 'Ben Lomond或休闲', '还车'], transport: '自驾+飞机', meals: '午餐Glenorchy 晚餐飞机上', accommodation: '奥克兰机场附近 ($150)', costBreakdown: { 住宿: 150, 交通: 30, 餐饮: 60, 门票: 0, 活动: 0 } },
          { day: 7, locations: ['queenstown', 'auckland'], activities: ['飞奥克兰(早班机)', '取车', '奥克兰市区半天'], transport: '飞机+租车', meals: '午餐奥克兰 晚餐Viaduct', accommodation: 'SO/ Auckland ($280)', costBreakdown: { 住宿: 280, 交通: 200, 餐饮: 80, 门票: 0, 活动: 0 } },
          { day: 8, locations: ['rotorua'], activities: ['Waitomo萤火虫洞', 'Wai-O-Tapu', 'Polynesian Spa'], transport: '自驾(2.5h+1.5h)', meals: '午餐Waitomo 晚餐Rotorua', accommodation: 'Ramada ($180)', costBreakdown: { 住宿: 180, 交通: 30, 餐饮: 80, 门票: 55, 活动: 70 } },
          { day: 9, locations: ['hobbiton'], activities: ['霍比屯', 'Te Puia毛利村'], transport: '自驾', meals: '午餐霍比屯 晚餐毛利Hangi', accommodation: 'Ramada ($180)', costBreakdown: { 住宿: 180, 交通: 20, 餐饮: 100, 门票: 0, 活动: 155 } },
          { day: 10, locations: ['auckland'], activities: ['Ponsonby', '还车', '离境'], transport: '自驾+机场', meals: '午餐Ponsonby', accommodation: '', costBreakdown: { 住宿: 0, 交通: 30, 餐饮: 60, 门票: 0, 活动: 0 } }
        ]),
        totalBudgetMin: 5000, totalBudgetMax: 6500
      }
    ]
  })

  // ── Posts (simulated 小红书 content) ──
  const posts = [
    { routeId: r1.id, authorName: '悉尼小饼干🍪', authorAvatar: '', title: '皇后镇3天真的够！附超详细每日账单', rawContent: '从悉尼飞皇后镇只要3小时！趁着mid-break赶紧冲了一波。3天时间把皇后镇+周边玩得明明白白，关键花费控制在了$600以内，学生党友好！Day1到了先湖边走走适应下，Skyline缆车必坐山顶自助餐view绝了。Day2开车去Glenorchy，那条路真的太美了一路拍不停，下午去Arrowtown逛逛。Day3去Wanaka看孤独的树，Crown Range公路弯道多但风景值回票价。总结：南岛适合自驾，租车AA很划算，住宿选YHA不踩雷。', aiSummary: JSON.stringify({ locations: ['皇后镇', '格林诺奇', '箭镇', '瓦纳卡'], activities: ['Skyline缆车', 'Glenorchy栈桥', 'Arrowtown漫步', '孤独的树'], duration: '3天', budget: '$600', season: '秋季', transport: '自驾租车', keyTips: ['提前订Skyline自助', '租车AA很划算', '住YHA性价比高', 'Crown Range公路弯多注意安全'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 2340, saves: 897, comments: 156, status: 'auto_published', sourcePublishedAt: new Date('2025-03-15') },

    { routeId: r1.id, authorName: '墨尔本小圆子', authorAvatar: '', title: '皇后镇5天舒适游花了$3500 值不值？', rawContent: '和闺蜜两个人从墨尔本出发的皇后镇5天之旅。选择舒适档位，住了Novotel和Edgewater，体验了Nevis蹦极（人生第一次！），Shotover喷射快艇超刺激，还去Onsen Hot Pools泡了温泉看山景。吃饭基本选的都是小红书推荐的网红餐厅，Rata的惠灵顿牛排真的绝。总花费$3500/人，虽然不便宜但体验感拉满，毕业旅行选这里太对了。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡', '格林诺奇'], activities: ['Nevis蹦极', 'Shotover快艇', 'Onsen温泉', 'Glenorchy快艇', '品酒'], duration: '5天', budget: '$3500', season: '夏季', transport: '自驾', keyTips: ['Nevis蹦极提前一周预约', 'Rata餐厅需要预约', 'Onsen温泉建议日落时段'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E6%97%85%E6%B8%B8', sourcePlatform: '小红书', likes: 5621, saves: 2103, comments: 342, status: 'auto_published', sourcePublishedAt: new Date('2025-01-20') },

    { routeId: r2.id, authorName: 'ANU留学狗🐶', authorAvatar: '', title: 'Tekapo星空✨南岛中线3天穷游攻略', rawContent: '堪培拉出发基督城往返，3天中线玩下来人均不到$500！基督城Jailhouse青旅很有意思真的是旧监狱改造的，Tekapo住holiday park超值。Hooker Valley Track免费但风景不输收费景点，一路雪山冰川做背景随便拍都出片。最震撼的是Tekapo的星空，肉眼可见银河，好牧人教堂前等到凌晨2点拍了人生照片。Fairlie Bakehouse的三文鱼派必吃！', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山'], activities: ['Botanical Gardens', '好牧人教堂', 'Tekapo观星', 'Hooker Valley徒步', 'Tasman Glacier'], duration: '3天', budget: '$500', season: '冬季', transport: '自驾', keyTips: ['Jailhouse青旅很有特色', 'Hooker Valley免费且出片', 'Fairlie Bakehouse三文鱼派必吃', '冬天晚上拍星空很冷带够衣服'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0Tekapo', sourcePlatform: '小红书', likes: 3891, saves: 1456, comments: 201, status: 'auto_published', sourcePublishedAt: new Date('2025-07-08') },

    { routeId: r2.id, authorName: '布村阿May', authorAvatar: '', title: '冰川直升机真的值得！Tekapo+Mt Cook四天全记录', rawContent: '参加了一个直升机冰川徒步团$450，虽然贵但真的毕生难忘！站在Tasman冰川上那种蓝真的太纯净了。Akaroa一日游的海豚巡游也很棒，看到好多Hectors dolphin。全程住Peppers和Hermitage，Teapo的Dark Sky Project观星团有中文导游很贴心。这趟花了$3000左右，但回忆无价。建议大家book的时候注意天气，我们差点因为云层太厚取消直升机。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山', '阿卡罗瓦'], activities: ['直升机冰川徒步', 'Dark Sky Project观星', 'Akaroa海豚巡游', 'Hooker Valley徒步'], duration: '4天', budget: '$3000', season: '春季', transport: '自驾', keyTips: ['直升机受天气影响大留好备选日期', 'Dark Sky Project有中文导游', 'Hermitage酒店看山景的房间更贵但值得'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%BA%93%E5%85%8B%E5%B1%B1%E5%86%B0%E5%B7%9D%E5%BE%92%E6%AD%A5', sourcePlatform: '小红书', likes: 4512, saves: 1834, comments: 267, status: 'auto_published', sourcePublishedAt: new Date('2025-10-05') },

    { routeId: r3.id, authorName: '悉大探险家🗺️', authorAvatar: '', title: '南岛7天环线自驾！每天开多久住哪里全写清楚了', rawContent: '南岛环线真的是经典中的经典，7天从基督城出发逆时针一圈。每天开车时间控制在3-4小时不会太累。Tekapo到Mt Cook那段SH80简直美哭，Lake Pukaki那个蓝色太不真实了。皇后镇到Milford Sound建议跟一日游团不要自己开，山路太累了。全程下来感觉时间刚好，不会太赶。新西兰的路况很好，女生一个人自驾也完全没问题。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山', '瓦纳卡', '皇后镇', '米尔福德峡湾'], activities: ['SH8/80公路自驾', '好牧人教堂', 'Hooker Valley徒步', 'Crown Range', 'Milford Sound游船', 'Skyline缆车'], duration: '7天', budget: '$4000', season: '夏季', transport: '自驾+Milford一日游巴士', keyTips: ['逆时针环线风景更好', 'Milford不建议自驾太累', '每天开车不超过4小时', 'Lake Pukaki观景台一定要停'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%8D%97%E5%B2%9B%E7%8E%AF%E7%BA%BF', sourcePlatform: '小红书', likes: 7821, saves: 3200, comments: 456, status: 'auto_published', sourcePublishedAt: new Date('2025-02-14') },

    { routeId: r3.id, authorName: 'Perth打工仔', authorAvatar: '', title: '10天南岛环线穷游版 $2500搞定！', rawContent: '从Perth飞基督城，10天南岛逆时针环线，全程青旅+自己做饭+租经济车。总花费$2500，比想象中便宜！几个省钱技巧：1.基督城超市买好一路的食材 2.Tekapo holiday park有厨房 3.Hooker Valley免费 4.Milford Sound自己在bookme上订有特价。新西兰最贵的是活动项目，选1-2个最想做的就好不用都参加。最美的风景其实都在路上，不花钱！', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山', '瓦纳卡', '皇后镇', '米尔福德峡湾'], activities: ['SH8公路', '好牧人教堂', 'Hooker Valley徒步', 'Crown Range', 'Milford Sound游船'], duration: '10天', budget: '$2500', season: '春季', transport: '自驾', keyTips: ['超市提前采购食材省很多', 'bookme上订活动有特价', '美在路上不一定要参加所有活动', 'holiday park厨房利用好'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%8D%97%E5%B2%9B%E8%87%AA%E9%A9%BE', sourcePlatform: '小红书', likes: 6210, saves: 2789, comments: 398, status: 'auto_published', sourcePublishedAt: new Date('2025-11-12') },

    { routeId: r4.id, authorName: 'Monash小幸运', authorAvatar: '', title: '霍比屯真的不是照骗！北岛7天全攻略', rawContent: '北岛7天从奥克兰出发绕一圈，霍比屯比想象中还要梦幻！Waitomo萤火虫洞也超级出片，虽然不让拍照但那个蓝色光点像星空一样。Rotorua的地热公园硫磺味很重但很震撼，Polynesian Spa晚上泡温泉看湖景绝了。最后Tongariro Alpine Crossing走了8个小时腿已废但值！翡翠湖那个绿色真的太惊艳了。北岛和南岛风格完全不一样，都值得去。', aiSummary: JSON.stringify({ locations: ['奥克兰', '霍比屯', '罗托鲁瓦', '汤加里罗', 'Waitomo'], activities: ['霍比屯电影游', 'Waitomo萤火虫洞', 'Wai-O-Tapu地热', 'Te Puia毛利村', 'Tongariro Alpine Crossing', 'Polynesian Spa'], duration: '7天', budget: '$3200', season: '春季', transport: '自驾', keyTips: ['霍比屯提前一周订票', '萤火虫洞不让拍照但值得去', 'Tongariro穿越需要一定体力', 'Rotorua硫磺味很重带口罩'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E9%9C%8D%E6%AF%94%E5%B1%AF', sourcePlatform: '小红书', likes: 4520, saves: 1920, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-09-28') },

    { routeId: r4.id, authorName: 'UQ卷王本王📚', authorAvatar: '', title: '北岛+南岛怎么选？去过两次的人来总结', rawContent: '第一次去新西兰建议南岛，自然风光天花板。第二次来北岛，人文体验满分。霍比屯影迷必去，地热公园那种大自然的鬼斧神工很震撼。Waitomo萤火虫洞一定要报black water rafting，黑水漂流比单纯坐船看刺激多了。Tongariro Alpine Crossing被评为世界十大单日徒步，走完确实有种征服感。总体说南岛看景北岛玩体验，预算够的话都去。', aiSummary: JSON.stringify({ locations: ['奥克兰', '霍比屯', '罗托鲁瓦', '汤加里罗'], activities: ['霍比屯', '黑水漂流', '地热公园', 'Tongariro徒步', '毛利文化体验'], duration: '7-10天', budget: '$3500', season: '全年皆可', transport: '自驾', keyTips: ['第一次来新西兰优先南岛', '黑水漂流比坐船看萤火虫好玩', 'Tongariro是世界级徒步', '北岛适合对人文感兴趣的'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%8C%97%E5%B2%9B%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 8901, saves: 4012, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-04-02') },

    { routeId: r5.id, authorName: '环游纽村的小王', authorAvatar: '', title: '14天南北岛大穿越🔥累是真的但值也是真的', rawContent: '暑假用了整整两周从基督城一路玩到奥克兰。南岛部分：基督城→Tekapo→Wanaka→皇后镇→Milford Sound，刚好一周。北岛部分：飞奥克兰→Waitomo→Rotorua→霍比屯→回奥克兰。最累的是Tongariro那天走了8小时，但一路风景值得。南北岛体验完全不同，南岛是自然震撼北岛是文化体验。全程花费$6000左右，住的基本是4星酒店，吃没省。建议大家预留充足时间，不要为了打卡赶路。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '瓦纳卡', '皇后镇', '米尔福德峡湾', '奥克兰', '罗托鲁瓦', '霍比屯'], activities: ['南岛经典环线', 'Milford Sound游船', '皇后镇极限运动', 'Waitomo萤火虫', 'Rotorua地热', '霍比屯', '奥克兰市区'], duration: '14天', budget: '$6000', season: '夏季', transport: '自驾+飞机', keyTips: ['两周时间南北岛足够但不宽裕', '南岛到北岛建议坐飞机', '不要为了打卡赶路', '暑假是旺季提前订住宿'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%8D%97%E5%8C%97%E5%B2%9B', sourcePlatform: '小红书', likes: 10230, saves: 5100, comments: 678, status: 'auto_published', sourcePublishedAt: new Date('2025-01-05') },

    { routeId: r5.id, authorName: 'UNSW户外社🏕️', authorAvatar: '', title: '南北岛大穿越穷游版$4000完成，附路线图', rawContent: '社团组队6人南北岛两周游。租了两辆车AA，住宿混合青旅+Airbnb，自己做饭为主。南岛部分最惊艳的是Milford Sound，北岛最爱霍比屯（虽然门票贵但影迷值得）。省钱心得：6人出行成本最低，租车住宿都能AA；多利用免费徒步（Hooker Valley, Tongariro）；超市采购比外食省一半。两周$4000/人，属于该花的花该省的省。新西兰真的太适合road trip了，路上风景才是最大的免费景点。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '皇后镇', '米尔福德峡湾', '奥克兰', '罗托鲁瓦', '霍比屯'], activities: ['南岛环线', 'Milford Sound', 'Tongariro徒步', '霍比屯', 'Rotorua地热', '萤火虫洞'], duration: '14天', budget: '$4000', season: '夏季', transport: '自驾+飞机', keyTips: ['多人出行成本最低', '免费徒步项目充分利用', '超市采购省一半餐饮费', '新西兰最美的风景在路上不花钱'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%97%85%E8%A1%8C%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 7650, saves: 3400, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-12-28') },

    // ── Posts for new routes ──
    { routeId: r6.id, authorName: '雪场打工人🏂', authorAvatar: '', title: 'Queenstown滑雪真的太香了！南半球雪质天花板', rawContent: '7月去的皇后镇滑雪，Cardrona和Remarkables两个雪场都刷了。雪质比澳洲好太多了，粉雪天超级爽。Cardrona适合所有级别，新手道又宽又长，中级道的公园也很棒。Remarkables风景更好，可以边滑边看湖。住宿选了市中心走路就能到雪场接驳站。Onsen Hot Pools滑完雪泡温泉简直人生巅峰。雪具不用带，镇上租的都很新。建议至少滑3天，1天只够热身。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡'], activities: ['Cardrona滑雪', 'Remarkables滑雪', 'Coronet Peak', 'Onsen Hot Pools'], duration: '4天', budget: '$2000', season: '冬季', transport: '雪场巴士', keyTips: ['雪具在当地租不用带', '至少滑3天才过瘾', '滑完泡Onsen温泉绝了', 'Cardrona适合新手'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E6%BB%91%E9%9B%AA', sourcePlatform: '小红书', likes: 4320, saves: 1890, comments: 278, status: 'auto_published', sourcePublishedAt: new Date('2025-07-20') },

    { routeId: r6.id, authorName: '猫本滑雪教练⛷️', authorAvatar: '', title: '预算$800三天皇后镇滑雪攻略 学生党也能冲', rawContent: '从墨尔本飞的皇后镇3天滑雪budget trip。雪场选Cardrona一天+Remarkables一天+Coronet Peak半天，总雪票$400左右。住宿YHA两人间$35一晚很干净。吃饭超市买食材自己煮省一半。交通全靠雪场接驳巴士，不用租车！最后算下来不含机票只花了$750。滑雪真的是新西兰冬天最值得做的事，雪山配湖景全世界独一份。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡'], activities: ['Cardrona滑雪', 'Remarkables滑雪', 'Coronet Peak'], duration: '3天', budget: '$800', season: '冬季', transport: '雪场巴士', keyTips: ['雪场巴士不用租车', 'YHA干净便宜', '超市自炊省很多', '买multi-day pass划算'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%BB%91%E9%9B%AA%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 3210, saves: 1560, comments: 195, status: 'auto_published', sourcePublishedAt: new Date('2025-08-05') },

    { routeId: r7.id, authorName: '胶片旅行者📷', authorAvatar: '', title: 'Milford Sound雨天比晴天更震撼！附峡湾全攻略', rawContent: '等了三年的Milford Sound终于去了。我们运气"好"赶上了大雨天，结果瀑布从每一面悬崖上倾泻下来，那个场景真的太震撼了。游船一定要坐2小时以上的，1小时的太赶了。Te Anau的萤火虫洞也很有意思，坐小船在一片漆黑中看发光的虫子像银河一样。Te Anau到Milford那段路本身就是景点，镜湖、荷马隧道、The Chasm都值得停。住Te Anau比住皇后镇方便多了，去峡湾不用4点起。', aiSummary: JSON.stringify({ locations: ['蒂阿瑙', '米尔福德峡湾'], activities: ['Milford Sound游船', 'Te Anau萤火虫洞', '镜湖', '荷马隧道', 'The Chasm步道'], duration: '3天', budget: '$800', season: '全年', transport: '自驾', keyTips: ['雨天瀑布更壮观不要怕', '住Te Anau不用赶路', '游船选2小时以上的', '路上景点预留充足时间'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%B1%B3%E5%B0%94%E7%A6%8F%E5%BE%B7%E5%B3%A1%E6%B9%BE%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 5630, saves: 2340, comments: 312, status: 'auto_published', sourcePublishedAt: new Date('2025-02-28') },

    { routeId: r7.id, authorName: '背包客小李🎒', authorAvatar: '', title: '南岛最被低估的地方：Te Anau+峡湾3天穷游', rawContent: '大部分人去南岛都在皇后镇打转，其实Te Anau才是隐藏宝藏。这个小镇是峡湾国家公园的门户，比皇后镇安静一百倍。Te Anau湖边日落美到窒息。萤火虫洞$75值得去。Milford Sound在bookme上订了早鸟票只要$55。全程青旅+自己做饭+经济车，3天人均才$500出头。最绝的是Kepler Track，免费的一日徒步能看到Fiordland最原始的山毛榉森林。推荐给喜欢自然不喜欢游客堆的朋友。', aiSummary: JSON.stringify({ locations: ['蒂阿瑙', '米尔福德峡湾'], activities: ['Milford Sound游船', 'Te Anau萤火虫洞', 'Kepler Track徒步', 'Lake Manapouri'], duration: '3天', budget: '$500', season: '春夏秋', transport: '自驾', keyTips: ['Te Anau比皇后镇安静', 'bookme订早鸟票便宜', 'Kepler Track免费且人少', '比皇后镇便宜很多'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E8%92%82%E9%98%BF%E7%91%99%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 2870, saves: 1340, comments: 167, status: 'auto_published', sourcePublishedAt: new Date('2025-03-10') },

    // ── Posts for new routes ──
    { routeId: r8.id, authorName: '极光猎人手札', authorAvatar: '', title: 'Franz Josef冰川值不值得去？直升机上冰川实拍全记录', rawContent: '从基督城开了5小时到Franz Josef，一路上Arthur\'s Pass的风景已经很震撼了！直升机冰川徒步$450是全程最贵的活动但也最值。站蓝冰上的感觉无法形容，向导还会带钻冰洞。Hokitika Gorge那个奶蓝色真的太出片了，完全不输Tekapo。西海岸天气多变，我们运气好赶上大晴天。预算有限的话冰川谷步道免费也能看到冰川远景。建议至少住一晚，冰川+温泉真的很治愈。', aiSummary: JSON.stringify({ locations: ['Franz Josef', 'Hokitika', 'Fox冰川'], activities: ['直升机冰川徒步', 'Hokitika Gorge', 'Glacier Hot Pools', 'Lake Matheson'], duration: '3天', budget: '$1000', season: '夏季', transport: '自驾', keyTips: ['直升机受天气影响大预留备选日', 'Hokitika Gorge免费且出片', '冰川温泉必泡', '西海岸天气多变带雨衣'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=Franz%20Josef%E5%86%B0%E5%B7%9D', sourcePlatform: '小红书', likes: 3210, saves: 1420, comments: 189, status: 'auto_published', sourcePublishedAt: new Date('2025-01-15') },

    { routeId: r9.id, authorName: '观鲸成功のLuna', authorAvatar: '', title: 'Kaikoura看到了三只抹香鲸！观鲸+海豚+龙虾一日全攻略', rawContent: 'Kaikoura真的太绝了！早上观鲸团看到了三只抹香鲸，船长说我们运气特别好。下午Peninsula Walkway走一圈看到几百只海豹在礁石上晒太阳。Nin\'s Bin龙虾餐车是全程最佳一餐，一只大龙虾$50新鲜到甜。第二天去Marlborough租自行车逛酒庄，Wither Hills的Sauvignon Blanc配生蚝绝了。基督城出发3天刚好，建议至少住2晚慢慢玩。', aiSummary: JSON.stringify({ locations: ['凯库拉', '布伦海姆'], activities: ['观鲸', '海豚同游', '龙虾午餐', 'Marlborough酒庄自行车', '品酒'], duration: '3天', budget: '$1200', season: '夏季', transport: '自驾+自行车', keyTips: ['观鲸成功率70%以上', 'Nin\'s Bin龙虾必吃', '租自行车逛酒庄最地道', 'Wither Hills午餐view一流'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%87%AF%E5%BA%93%E6%8B%89%E8%A7%82%E9%B2%B8', sourcePlatform: '小红书', likes: 4512, saves: 2100, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-02-20') },

    { routeId: r10.id, authorName: '北岛流浪记', authorAvatar: '', title: '岛屿湾3天：出海探洞+海豚+最北灯塔，北岛不止霍比屯', rawContent: '大部分人去北岛只到霍比屯和Rotorua，其实再往北3小时到岛屿湾才是真正的度假天堂！144个岛屿散落在碧蓝海水里，游船穿洞的时候全船人都在尖叫。海豚超级多，有几条跟着船游了好久。Cape Reinga的灯塔站在新西兰最北端看塔斯曼海和太平洋交汇，那个分界线真的能看到。Russell小镇巨安静巨美，新西兰最古老的首都。强烈推荐给喜欢海的朋友！', aiSummary: JSON.stringify({ locations: ['派希亚', 'Cape Reinga', 'Russell'], activities: ['岛屿湾游船探洞', '海豚巡游', 'Cape Reinga灯塔', '九十英里海滩', 'Russell历史小镇'], duration: '3天', budget: '$1000', season: '夏季', transport: '自驾+游船', keyTips: ['奥克兰自驾3小时到', '游船选半天以上的', 'Cape Reinga一定要去', 'Russell比Paihia更安静'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%B2%9B%E5%B1%BF%E6%B9%BE%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 2890, saves: 1340, comments: 178, status: 'auto_published', sourcePublishedAt: new Date('2025-03-05') },

    { routeId: r11.id, authorName: '樱桃猎人🍒', authorAvatar: '', title: '中奥塔哥樱桃季！边摘边吃+酒庄+布拉夫生蚝的极致3天', rawContent: '12月去新西兰一定要去Cromwell摘樱桃！入园费$10随便吃，带走的才$15/kg。那个樱桃大得像李子，甜到怀疑人生。旁边就是Bannockburn酒庄区，Pinot Noir超有名。第二天去了Bluff吃生蚝，虽然远但值得，Stirling Point牌子打卡南岛最南端。整个中奥塔哥秋天也超美，葡萄园一片金黄。从皇后镇出发45分钟就到Cromwell，很适合做皇后镇的day trip延伸。', aiSummary: JSON.stringify({ locations: ['克伦威尔', '布拉夫', 'Gibbston'], activities: ['樱桃采摘', '酒庄品酒', 'Bluff生蚝', 'Stirling Point', 'Kawarau Gorge'], duration: '3天', budget: '$800', season: '夏季', transport: '自驾', keyTips: ['夏季12-1月樱桃季', 'Gibbston Valley酒庄午餐很棒', 'Bluff生蚝$25/打', '中奥塔哥秋天也很美'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown,new-zealand,travel-photo","https://loremflickr.com/300/400/milford-sound,new-zealand,scenic"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E4%B8%AD%E5%A5%A5%E5%A1%94%E5%93%A5%E6%A8%B1%E6%A1%83', sourcePlatform: '小红书', likes: 3560, saves: 1780, comments: 223, status: 'auto_published', sourcePublishedAt: new Date('2025-12-10') },

    // ── Additional posts for richer content ──
    { routeId: r1.id, authorName: '独行侠阿琳🎒', authorAvatar: '', title: '女生一个人自驾皇后镇4天安全吗？实测全攻略', rawContent: '一个人从悉尼飞皇后镇，租了辆Corolla开始了4天独旅。女生自驾完全没问题！新西兰路况好、车少、加油站多。唯一要注意的是Crown Range公路弯多路窄，开慢点就行。住宿选的YHA女生间，$38一晚很干净还认识了两个德国妹子一起拼了Fergburger。Nevis蹦极一个人跳反而更勇敢，反正都是陌生人哈哈。Skyline山顶遇到了一对基督城来的老夫妻聊了好久。总结：新西兰是独旅天花板，安全友好风景绝。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡', '箭镇', '格林诺奇'], activities: ['自驾独旅', 'Skyline缆车', 'Nevis蹦极', 'Arrowtown漫步', 'Glenorchy拍照'], duration: '4天', budget: '$700', season: '秋季', transport: '租车自驾', keyTips: ['女性独旅新西兰很安全', 'Crown Range弯多慢行', 'YHA女生间干净便宜', '一个人也能拼餐省钱'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/solo-travel,new-zealand","https://loremflickr.com/300/400/queenstown-road-trip"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%8B%AC%E8%87%AA%E6%97%85%E8%A1%8C%E7%9A%87%E5%90%8E%E9%95%87', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-04-15') },

    { routeId: r1.id, authorName: '摄影湿小陈📷', authorAvatar: '', title: '皇后镇下雨怎么办？阴天Plan B也能拍大片', rawContent: '去皇后镇赶上连下两天雨心态差点崩了。还好提前做了Plan B：第一天去了Onsen Hot Pools泡温泉，下雨天泡温泉反而更有意境，山间雾气缭绕像仙境。第二天去了Gibbston Valley酒庄，洞穴酒窖品酒完全不看天气，Cheese platter绝了配Pinot Noir。Arrowtown下雨天游客少，彩色小屋配湿漉漉的石板路反而更有氛围感出片。雨天记得带防水鞋和冲锋衣，不要打伞风大。最重要的是：雨天瀑布更壮观！', aiSummary: JSON.stringify({ locations: ['皇后镇', '箭镇', 'Gibbston Valley'], activities: ['Onsen温泉', '酒庄品酒', 'Arrowtown雨景', 'Skyline室内'], duration: '2-3天', budget: '$400', season: '全年', transport: '自驾', keyTips: ['下雨天温泉更有意境', '酒庄品酒不看天气', '雨天Arrowtown人少出片', '带防水装备不打伞'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/rainy-queenstown","https://loremflickr.com/300/400/onsen-hot-pools"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E9%9B%A8%E5%A4%A9', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 210, status: 'auto_published', sourcePublishedAt: new Date('2025-06-20') },

    { routeId: r1.id, authorName: '布村孝女小芳', authorAvatar: '', title: '带60岁爸妈游皇后镇！不累又出片的5天慢游攻略', rawContent: '爸妈从国内来澳洲看我，顺路去了新西兰。全程节奏放慢：不蹦极不徒步，改坐蒸汽船+缆车+酒庄。爸妈最喜欢TSS Earnslaw蒸汽船，百年老船在Wakatipu湖上慢悠悠开，还有钢琴伴奏。Skyline缆车上去后爸妈在观景台拍了半小时。住的是Airbnb湖景公寓$180/晚，有厨房可以煮中餐，爸妈吃不惯西餐。全程自驾但每天只开1-2小时。重点：给爸妈租了登山杖，走湖边步道轻松又安全。', aiSummary: JSON.stringify({ locations: ['皇后镇', '箭镇', 'Gibbston Valley'], activities: ['TSS蒸汽船', 'Skyline缆车', 'Walter Peak农场', 'Arrowtown漫步', 'Gibbston酒庄品酒'], duration: '5天', budget: '$2500', season: '春夏秋', transport: '自驾', keyTips: ['蒸汽船老年人友好', '住Airbnb有厨房煮中餐', '租登山杖走步道轻松', '每天开车不超过2小时'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/family-travel-queenstown","https://loremflickr.com/300/400/tss-earnslaw"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%B8%A6%E7%88%B6%E6%AF%8D%E6%96%B0%E8%A5%BF%E5%85%B0', sourcePlatform: '小红书', likes: 6780, saves: 3200, comments: 456, status: 'auto_published', sourcePublishedAt: new Date('2025-03-20') },

    { routeId: r2.id, authorName: '天文狗小王🔭', authorAvatar: '', title: '冬天去Tekapo拍星空才是正确打开方式！附相机参数', rawContent: '很多人夏天去Tekapo，但冬天才是星空季！6-8月天黑得早（5点半就黑了），不用熬夜就有银河。而且冬天游客少，好牧人教堂前基本不用抢机位。相机参数：Sony A7M4 + 16-35 f2.8，ISO 3200，快门20s，对焦无穷远拉回一点。一定要带三脚架和快门线，Tekapo冬天晚上零下，电池多带两块！Dark Sky Project观星团很值得，中文导游讲了很多毛利星象故事。Fairlie Bakehouse冬天来一碗热汤配肉派绝了。', aiSummary: JSON.stringify({ locations: ['蒂卡波湖', '库克山'], activities: ['冬季银河拍摄', 'Dark Sky观星团', '好牧人教堂夜景', 'Hooker Valley冬季徒步', 'Tekapo Springs温泉'], duration: '3天', budget: '$700', season: '冬季', transport: '自驾', keyTips: ['冬天5:30天黑不用熬夜', '三脚架必带多带电池', '冬天好牧人教堂人少', '冬天路上可能有暗冰慢行'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/tekapo-stars-winter","https://loremflickr.com/300/400/church-good-shepherd-night"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=tekapo%E5%86%AC%E5%A4%A9%E6%98%9F%E7%A9%BA', sourcePlatform: '小红书', likes: 5620, saves: 2800, comments: 387, status: 'auto_published', sourcePublishedAt: new Date('2025-07-15') },

    { routeId: r2.id, authorName: '堪村打工人小李', authorAvatar: '', title: '基督城-Tekapo中线青旅测评：$40一晚到底值不值', rawContent: '中线全程住了3家青旅，来给大家排雷：1.基督城Jailhouse（$35/床位）：旧监狱改造最有特色，每间牢房都不一样，厨房大且干净，墙裂推荐！2.Tekapo Holiday Park（$40/小木屋）：不是传统青旅是营地小木屋，有独立空间但冬天冷，暖气要额外$5。3.Mt Cook Backpacker Lodge（$45/床位）：位置绝佳，窗户直接看雪山，但设施老旧。总结：穷游首选Jailhouse，想离山近选Mt Cook Lodge，Tekapo Holiday Park适合自驾露营。所有青旅都要提前订，旺季爆满。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山'], activities: ['青旅体验', '背包客省钱', 'Jailhouse特色住宿', 'Holiday Park露营'], duration: '3天', budget: '$400', season: '全年', transport: '自驾', keyTips: ['Jailhouse旧监狱最有特色', '旺季青旅提前两周订', 'Holiday Park冬天加$5暖气', '背包客厨房能省一半饭钱'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/jailhouse-hostel","https://loremflickr.com/300/400/backpacker-new-zealand"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E9%9D%92%E6%97%85', sourcePlatform: '小红书', likes: 3210, saves: 1450, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-05-08') },

    { routeId: r3.id, authorName: '蜜月旅行规划师💍', authorAvatar: '', title: '南岛7天蜜月版：这家酒店太浪漫了！私藏浪漫路线分享', rawContent: '和老公的蜜月选了新西兰南岛环线，全程住了几家巨浪漫的酒店：Edgewater Wanaka的湖景房推开窗就是孤独的树，The Hermitage的雪山套房晚上躺在床上看Aoraki。最惊喜的是皇后镇Matakauri Lodge，虽然贵（$1800/晚）但每个房间都有壁炉和湖景浴缸。路线安排得很轻松每天开车不超过3小时。Milford Sound选了小飞机+游船组合，从空中看峡湾比坐大巴震撼一百倍。全程花费$8000/人，蜜月就该对自己好一点。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡', '库克山', '米尔福德峡湾', '基督城'], activities: ['浪漫酒店', 'Milford小飞机+游船', 'Gibbston酒庄晚宴', 'Onsen私人温泉', 'Skyline浪漫晚餐'], duration: '7天', budget: '$8000', season: '秋季', transport: '自驾+小飞机', keyTips: ['Edgewater湖景房$350起', 'Hermitage雪山套房提前订', 'Matakauri Lodge蜜月首选', 'Milford小飞机比大巴震撼'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/honeymoon-new-zealand","https://loremflickr.com/300/400/matakauri-lodge"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E8%9C%9C%E6%9C%88', sourcePlatform: '小红书', likes: 12300, saves: 5600, comments: 890, status: 'auto_published', sourcePublishedAt: new Date('2025-04-20') },

    { routeId: r3.id, authorName: '风光狗阿杰', authorAvatar: '', title: '南岛12个绝美机位全记录！附GPS坐标+最佳拍摄时间', rawContent: '在南岛蹲了10天拍了2000多张照片，精选12个机位分享：1.好牧人教堂-日出前30分钟（夏天5:30到），鲁冰花当前景。2.Lake Pukaki Visitor Centre-上午9-11点顺光湖水最蓝。3.Hooker Valley第二座吊桥-上午逆光拍吊桥+雪山。4.Lindis Pass最高点（GPS -44.7815,169.6365）-黄昏金色草甸。5.Crown Range Summit-拍之字形公路需要长焦压缩。6.孤独的树-清晨无风水面如镜。7.Skyline观景台-日落前1小时金色光线。8.Milford Sound-雨后瀑布最壮观。拍风光要舍得早出晚归，最好的光在日出日落。', aiSummary: JSON.stringify({ locations: ['蒂卡波湖', '库克山', '瓦纳卡', '皇后镇', '米尔福德峡湾'], activities: ['风光摄影', '12个机位', '日出日落拍摄', '鲁冰花季节', '长焦压缩公路'], duration: '10天', budget: '$3000', season: '秋季', transport: '自驾', keyTips: ['好牧人教堂日出前30分钟到', 'Lindis Pass黄昏光最好', '孤独的树清晨无风拍倒影', '带长焦70-200mm拍公路'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/nz-photography-spots","https://loremflickr.com/300/400/lindis-pass-sunset"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%91%84%E5%BD%B1%E6%9C%BA%E4%BD%8D', sourcePlatform: '小红书', likes: 9800, saves: 4500, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-03-25') },

    { routeId: r4.id, authorName: '地热爱好者🌋', authorAvatar: '', title: '北岛温泉大全：Polynesian Spa vs Te Aroha vs Hot Water Beach', rawContent: '北岛泡了5个温泉，来个横向测评：1.Polynesian Spa（Rotorua）$30-50：湖景池最佳，有家庭池和成人池分开，推荐傍晚看日落。2.Te Aroha Mineral Spa：天然矿物温泉$15，人少像私人温泉。3.Hot Water Beach（Coromandel）：免费！退潮时挖个坑就有热水冒出来，很独特的体验但人多。4.Wai-O-Tapu虽然不能泡但是最美地热公园。5.秘密推荐：Kerosene Creek免费野温泉，本地人才知道，在Rotorua附近的热水溪流。泡温泉最佳时间是傍晚，人少光线好。', aiSummary: JSON.stringify({ locations: ['罗托鲁瓦', 'Te Aroha', 'Coromandel'], activities: ['温泉横向测评', 'Polynesian Spa', 'Hot Water Beach', 'Kerosene Creek野温泉', 'Wai-O-Tapu地热'], duration: '2-3天', budget: '$300', season: '全年', transport: '自驾', keyTips: ['Polynesian Spa傍晚去人少', 'Kerosene Creek免费野温泉', 'Hot Water Beach自带铲子', '地热区硫磺味重带旧泳衣'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/polynesian-spa","https://loremflickr.com/300/400/hot-water-beach"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%B8%A9%E6%B3%89', sourcePlatform: '小红书', likes: 4530, saves: 2100, comments: 312, status: 'auto_published', sourcePublishedAt: new Date('2025-08-10') },

    { routeId: r4.id, authorName: '雪地菜鸟阿强', authorAvatar: '', title: 'Tongariro冬天穿越要冰爪！差点滑下山的新手血泪教训', rawContent: '6月去走Tongariro Alpine Crossing，之前看攻略说冬天也能走就没在意。结果到了才发现山上全是冰雪！普通登山鞋在冰面上完全没抓力，快走到翡翠湖那段最陡的地方差点滑下去。后来一个好心的向导借了我冰爪才走完。冬天走Tongariro一定要带冰爪和登山杖，最好请向导（$200/人包装备）。冬天翡翠湖被雪覆盖一半，颜色更绝！而且冬天人少，整个山感觉就我们一个队伍。虽然危险但冬天的末日火山更震撼。', aiSummary: JSON.stringify({ locations: ['汤加里罗'], activities: ['冬季Tongariro穿越', '冰爪徒步', '翡翠湖雪景', '向导服务', '冬季安全'], duration: '1天', budget: '$200', season: '冬季', transport: '接驳车+向导', keyTips: ['冬天必须带冰爪', '建议请向导$200包装备', '翡翠湖冬天更震撼', '冬天人少但更危险'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/tongariro-winter","https://loremflickr.com/300/400/tongariro-ice"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=tongariro%E5%86%AC%E5%A4%A9', sourcePlatform: '小红书', likes: 5670, saves: 2900, comments: 423, status: 'auto_published', sourcePublishedAt: new Date('2025-06-15') },

    { routeId: r5.id, authorName: '房车旅行日记🚐', authorAvatar: '', title: '新西兰房车14天南北岛：营地怎么选？花费多少？值得吗？', rawContent: '和男友租了Maui的4人房车（其实两个人睡刚好）从基督城一路开到奥克兰。房车花费：租车$180/天×14天=$2520，营地$25-40/晚，柴油$2.2/L。总花费比住酒店+租车便宜30%！而且想停就停，在Lake Pukaki边上醒来窗外就是奶蓝色湖水，那种体验酒店给不了。营地推荐：Tekapo的Lakefront Lodge（$40/晚带电桩）、Wanaka的Holiday Park（湖景位$35）、Rotorua的Top 10（有温泉池）。注意：房车不能随便停在路边过夜，会被罚款！一定要用CamperMate APP查营地。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '瓦纳卡', '皇后镇', '罗托鲁瓦', '奥克兰'], activities: ['房车旅行', '营地生活', 'CamperMate导航', '自己做饭', 'Lake Pukaki营地日出'], duration: '14天', budget: '$4000', season: '夏季', transport: 'Maui房车', keyTips: ['房车比酒店+租车省30%', '必须用CamperMate查营地', '路边过夜会罚款', '营地$25-40/晚带电桩'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/campervan-new-zealand","https://loremflickr.com/300/400/lake-pukaki-campsite"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%88%BF%E8%BD%A6', sourcePlatform: '小红书', likes: 8900, saves: 4200, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-01-25') },

    { routeId: r6.id, authorName: '零基础学滑雪⛷️', authorAvatar: '', title: '滑雪小白在Cardrona上了3天课，从魔毯到蓝道全记录', rawContent: '从来没滑过雪的新手，在Cardrona报了3天group lesson。Day1学刹车和转弯，上午魔毯下午就上了绿道。Day2巩固平行转弯，教练带着刷了几趟绿道。Day3竟然上了蓝道！虽然摔了无数次但真的太爽了。费用：3天课程+雪票+雪具$650，比澳洲便宜太多了。Cardrona的新手区又宽又长，雪质好摔了不疼。山顶的咖啡厅也很棒，不滑雪的朋友也可以坐缆车上去看风景喝咖啡$45。小tip：带防晒！雪地反射超强，我的脸第一天就晒伤了。', aiSummary: JSON.stringify({ locations: ['瓦纳卡', '皇后镇'], activities: ['Cardrona滑雪课', '新手学滑雪', '魔毯到蓝道', '山顶咖啡厅', '雪具租赁'], duration: '3天', budget: '$650', season: '冬季', transport: '雪场巴士', keyTips: ['3天group lesson$650超值', 'Cardrona新手区友好', '一定要带防晒雪地反射强', '不滑雪也能坐缆车$45'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/cardrona-ski-school","https://loremflickr.com/300/400/snowboard-beginner"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=cardrona%E6%96%B0%E6%89%8B%E6%BB%91%E9%9B%AA', sourcePlatform: '小红书', likes: 4120, saves: 2100, comments: 278, status: 'auto_published', sourcePublishedAt: new Date('2025-07-25') },

    { routeId: r8.id, authorName: '西海岸老司机🚙', authorAvatar: '', title: '西海岸6天自驾：这条被低估的路线比皇后镇好玩10倍', rawContent: '南岛来了三次，这次专走西海岸，发现这才是南岛精华！Christchurch→Arthur\'s Pass→Hokitika→Franz Josef→Fox Glacier→Wanaka，6天全程600km每天开车2小时内不赶路。Hokitika Gorge那个奶蓝色美哭，而且免费没人！比Tekapo人少一万倍。Franz Josef冰川徒步建议选早班（8点），上午天气稳定成功率最高。Fox Glacier的Lake Matheson清晨倒影是此行最佳照片。西海岸的雨林+海岸+冰川三位一体，体验层次比皇后镇丰富太多。唯一的代价是西海岸sandfly巨多，防蚊液随身带。', aiSummary: JSON.stringify({ locations: ['基督城', 'Arthur\'s Pass', '霍基蒂卡', 'Franz Josef', 'Fox冰川', '瓦纳卡'], activities: ['西海岸自驾', 'Hokitika Gorge', 'Franz Josef冰川徒步', 'Lake Matheson倒影', 'Arthur\'s Pass', 'Glacier Hot Pools'], duration: '6天', budget: '$1500', season: '夏季', transport: '自驾', keyTips: ['西海岸比皇后镇更原生态', 'Hokitika Gorge免费且人少', '冰川徒步选早班8点最稳', 'Sandfly很多带防蚊液'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/west-coast-road-trip","https://loremflickr.com/300/400/hokitika-gorge-blue"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E8%A5%BF%E6%B5%B7%E5%B2%B8%E8%87%AA%E9%A9%BE', sourcePlatform: '小红书', likes: 6540, saves: 3200, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-02-10') },

    { routeId: r9.id, authorName: '海豹控阿may🦭', authorAvatar: '', title: 'Kaikoura除了观鲸还能和海豹游泳！$150的野生体验', rawContent: '大部分人只知道Kaikoura观鲸，但Seal Swim才是隐藏王炸！$150穿潜水衣和毛皮海豹在浅水区游泳，那些海豹超级好奇会主动凑过来看你。夏天水温15度左右穿7mm潜水衣不冷。观鲸$150也很值，看到了两只抹香鲸喷水+甩尾。重点是这两个活动都是全年可做！不像某些季节限定。Nin\'s Bin龙虾一定要上午去，下午可能卖完。另外推荐Peninsula Walkway免费步道，海豹就在步道边的礁石上，不用花钱也能近距离看到。Kaikoura的海鲜+海洋动物+雪山海景，一天值回机票。', aiSummary: JSON.stringify({ locations: ['凯库拉'], activities: ['Seal Swim海豹同游', '观鲸', 'Peninsula Walkway海豹', 'Nin\'s Bin龙虾', 'Kaikoura海鲜'], duration: '2天', budget: '$500', season: '全年', transport: '自驾', keyTips: ['Seal Swim $150值得', '观鲸全年可做', 'Nin\'s Bin龙虾上午去', 'Peninsula Walkway免费看海豹'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/kaikoura-seal-swim","https://loremflickr.com/300/400/kaikoura-whale"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%87%AF%E5%BA%93%E6%8B%89%E6%B5%B7%E8%B1%B9', sourcePlatform: '小红书', likes: 5230, saves: 2500, comments: 378, status: 'auto_published', sourcePublishedAt: new Date('2025-01-10') },

    { routeId: r10.id, authorName: '南北岛对比控', authorAvatar: '', title: '新西兰南岛vs北岛怎么选？去了4次的人终极对比', rawContent: '新西兰去了4次（南岛3次北岛1次），总结对比：南岛=自然风光天花板。雪山+冰川+峡湾+湖泊的组合全世界独一份。适合：第一次来新西兰、喜欢自然风光、自驾、徒步、摄影。北岛=人文体验满分。霍比屯+毛利文化+地热+温泉+萤火虫洞，互动性更强。适合：指环王影迷、喜欢文化体验、亲子游、不想开太多车。建议：第一次来选南岛7-10天，第二次来北岛5-7天，第三次南北岛一起14天。不要把南北岛塞进一周，太赶了体验很差。预算上南岛比北岛贵20%左右。', aiSummary: JSON.stringify({ locations: ['南岛', '北岛', '皇后镇', '奥克兰', '基督城'], activities: ['南北岛对比', '南岛自然风光', '北岛人文体验', '行程规划建议', '预算对比'], duration: '7-14天', budget: '$5000-8000', season: '全年', transport: '自驾+飞机', keyTips: ['第一次来优先南岛', '南岛比北岛贵20%', '不要一周内去南北岛', '北岛适合亲子游'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/new-zealand-comparison","https://loremflickr.com/300/400/north-vs-south"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%8D%97%E5%B2%9B%E5%8C%97%E5%B2%9B%E5%AF%B9%E6%AF%94', sourcePlatform: '小红书', likes: 11200, saves: 5200, comments: 678, status: 'auto_published', sourcePublishedAt: new Date('2025-05-10') },

    // ═══ 70 more posts for richer content ═══

    // ── R1 Queenstown additional (5 new) ──
    { routeId: r1.id, authorName: '极限运动中毒者🪂', authorAvatar: '', title: '皇后镇三大蹦极横评：Nevis vs Kawarau vs Ledge 哪个最刺激', rawContent: '作为一个蹦极上瘾的人，皇后镇三个蹦极都跳了来写横评。Nevis（$275）：134米南半球最高，8.5秒自由落体，最恐怖也最爽，站在平台上看下面的河谷腿都软了。Kawarau桥（$205）：43米，蹦极发源地，可以选触水或不触水，历史意义满分。Ledge（$175）：Skyline山顶400米高空的秋千式蹦极，夜景跳超级浪漫。综合推荐：第一次跳选Kawarau（有历史意义），追求刺激选Nevis，想浪漫选Ledge夜跳。三个都可以提前在bookme上找特价。', aiSummary: JSON.stringify({ locations: ['皇后镇'], activities: ['Nevis蹦极', 'Kawarau蹦极', 'Ledge蹦极', '极限运动横评'], duration: '2天', budget: '$650', season: '全年', transport: '含接送', keyTips: ['第一次跳推荐Kawarau', 'Nevis最刺激134米', 'bookme上找特价', 'Ledge夜跳很浪漫'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/bungy-nevis","https://loremflickr.com/300/400/kawarau-bridge"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E8%B9%A6%E6%9E%81', sourcePlatform: '小红书', likes: 7890, saves: 3400, comments: 456, status: 'auto_published', sourcePublishedAt: new Date('2025-02-18') },

    { routeId: r1.id, authorName: '湖景酒店控🏨', authorAvatar: '', title: '皇后镇7家网红酒店真实入住测评：Eichardts值$1200吗', rawContent: '在皇后镇住了7家不同档次的酒店，客观测评：奢华档-Eichardts Private Hotel（$1200/晚）：私人管家+壁炉套房+湖景浴缸，确实值但只适合特殊纪念日。Matakauri Lodge（$1800）：比Eichardts更私密，每个房间看湖的角度都是画框。舒适档-Novotel Lakeside（$220）：位置最佳码头边，性价比最高。Hilton（$280）：离市区10分钟但湖景+温泉池很棒。穷游档-YHA Lakefront（$35床位）：位置绝佳厨房大，缺点是旺季爆满要提前一周订。Jucy Snooze（$29）：胶囊旅馆但很干净设计感强。总结：舒适档Novotel最推荐，穷游YHA最好。', aiSummary: JSON.stringify({ locations: ['皇后镇'], activities: ['酒店横评', 'Eichardts体验', 'Matakauri Lodge', 'Novotel', 'Hilton', 'YHA'], duration: '按需', budget: '$35-1800', season: '全年', transport: '市区步行', keyTips: ['Novotel性价比最高', 'YHA旺季提前一周订', 'Eichardts适合纪念日', 'Hilton虽远但温泉棒'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown-hotel","https://loremflickr.com/300/400/eichardts-hotel"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E9%85%92%E5%BA%97', sourcePlatform: '小红书', likes: 6780, saves: 3200, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-03-12') },

    { routeId: r1.id, authorName: '新西兰代购小赵🛍️', authorAvatar: '', title: '皇后镇购物攻略：这些NZ本土品牌比免税店还便宜', rawContent: '皇后镇不只是玩，购物也可以很爽！推荐几个必逛：1.Icebreaker（Shotover Street）：NZ最美利奴羊毛衫，比澳洲便宜30%，店里经常有second折扣区。2.Macpac：户外装备，冲锋衣$150起，质量不输始祖鸟但价格一半。3.Superdry：皇后镇店的折扣比奥克兰大。4.Countdown超市：伴手礼天堂！Whittakers巧克力$5/块、Manuka Health蜂蜜$25起、Lemon & Paeroa汽水$2。5. Remarkables Market（周六上午）：本地手工果酱、精油、陶瓷。退税tip：同一家店满$50可退税15%。', aiSummary: JSON.stringify({ locations: ['皇后镇'], activities: ['购物攻略', 'Icebreaker羊毛衫', 'Macpac户外', '本地超市伴手礼', 'Remarkables集市'], duration: '半天', budget: '$200', season: '全年', transport: '步行', keyTips: ['Icebreaker比澳洲便宜30%', 'Countdown超市伴手礼最划算', '满$50可退税15%', '周六市场本地手工艺品'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown-shopping","https://loremflickr.com/300/400/icebreaker-store"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E8%B4%AD%E7%89%A9', sourcePlatform: '小红书', likes: 4560, saves: 2300, comments: 321, status: 'auto_published', sourcePublishedAt: new Date('2025-04-05') },

    { routeId: r1.id, authorName: '越野跑者小林🏃', authorAvatar: '', title: 'Ben Lomond徒步完整攻略：几点出发、带多少水、哪个季节最美', rawContent: 'Ben Lomond是皇后镇性价比最高的徒步（免费！）。全程11km爬升1400m，6-8小时。关键信息：起点在Skyline缆车站上面（坐缆车$59或自己爬1小时Tiki Trail到缆车站省$59）。水分至少要2L夏天3L，路上无补给。最佳季节：12-3月山上无雪最安全，4-5月秋天山顶有雪但颜色最美。出发时间：夏天6点天黑前能下山，春秋建议7点前出发。装备：登山鞋必须（石头路硌脚），登山杖能省30%体力。Saddle点（半程）风景已经很好了，体力一般的走到这就行。山顶360度看Wakatipu湖+卓越山脉+Aspiring山。', aiSummary: JSON.stringify({ locations: ['皇后镇'], activities: ['Ben Lomond徒步', 'Tiki Trail', 'Saddle半程', '山顶360全景'], duration: '1天', budget: '$0-59', season: '夏季最佳', transport: '步行/缆车', keyTips: ['走Tiki Trail省$59缆车', '夏天3L水冬天2L', '登山杖省30%体力', 'Saddle半程风景已很好'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/ben-lomond-track","https://loremflickr.com/300/400/ben-lomond-summit"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=Ben%20Lomond%E5%BE%92%E6%AD%A5', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-01-08') },

    { routeId: r1.id, authorName: '吃货地图册🍔', authorAvatar: '', title: '皇后镇不吃Fergburger吃什么？10家本地人私藏餐厅', rawContent: 'Fergburger游客排队一小时太浪费时间了！本地人都在吃的10家：1.Rata（惠灵顿牛排$45）- Josh Emett的店，品质稳定。2.The Bunker（鸡尾酒$18+小食）- 隐藏在小巷的speakeasy。3.Bespoke Kitchen（牛油果吐司$22）- 周日brunch最美。4.Flame Bar&Grill（猪肋排$28）- 份量大两个人分。5.Kappa Japanese（拉面$18）- 冬天暖胃首选。6.Tanoshi（居酒屋$35/人）- 烤串+清酒很地道。7.Atlas Beer Cafe（精酿$10/杯）- 本地精酿+牛排。8.Yonder（全日早餐$20）- 素食友好。9.Erik\'s Fish&Chips（blue cod$14）- 比码头那家好吃。10.Patagonia Chocolates（热巧克力$6+冰淇淋）- 湖边位置绝佳。', aiSummary: JSON.stringify({ locations: ['皇后镇'], activities: ['美食攻略', '本地人推荐', 'Rata', 'Bespoke', 'Flame', '日料', '精酿啤酒'], duration: '按需', budget: '$10-100', season: '全年', transport: '步行', keyTips: ['Fergburger错峰去不用排队', 'Rata需提前一周订位', 'Flame猪肋排两人分', 'Patagonia湖边吃冰淇淋'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown-food","https://loremflickr.com/300/400/rata-restaurant-dish"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%9A%87%E5%90%8E%E9%95%87%E7%BE%8E%E9%A3%9F', sourcePlatform: '小红书', likes: 9320, saves: 4500, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-03-28') },

    // ── R2 Christchurch-Tekapo-Mt Cook additional (3 new) ──
    { routeId: r2.id, authorName: '基督城local小张', authorAvatar: '', title: '基督城真的无聊吗？住了2年的人给你24小时深度玩法', rawContent: '很多人把基督城当中转站只待半天就走了，太可惜！24小时深度玩法：早上8点去Botanical Gardens晨跑（免费，比白天人少一百倍），9点C1 Espresso吃早餐（气压管道送餐超有趣）。10点Cardboard Cathedral（纸板教堂免费参观，建筑师坂茂设计）。11点Gondola上山（$35，山顶喝咖啡看全景）。13点Riverside Market午餐（选Greek Gods souvlaki$16）。14点Canterbury Museum（免费，毛利文化+南极探险展）。16点New Regent Street拍照（彩色西班牙风格建筑）喝Rollickin Gelato。18点Pomeroy\'s Pub晚餐（英式老酒馆，fish&chips$22+本地精酿）。基督城是一种慢慢品才会爱上的城市。', aiSummary: JSON.stringify({ locations: ['基督城'], activities: ['Botanical Gardens晨跑', 'C1 Espresso', '纸板教堂', 'Gondola', 'Riverside Market', 'Canterbury Museum', 'New Regent Street', 'Pomeroy\'s Pub'], duration: '1天', budget: '$100', season: '全年', transport: '步行+Uber', keyTips: ['基督城值得住一晚', 'C1 Espresso必去', 'Canterbury Museum免费', 'New Regent Street拍照出片'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/christchurch-city","https://loremflickr.com/300/400/c1-espresso"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%9F%BA%E7%9D%A3%E5%9F%8E%E4%B8%80%E6%97%A5%E6%B8%B8', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 289, status: 'auto_published', sourcePublishedAt: new Date('2025-04-22') },

    { routeId: r2.id, authorName: '追极光的艾琳🌌', authorAvatar: '', title: 'Tekapo不止有星空！冬天追南极光的隐藏攻略', rawContent: '大家都知道Tekapo是观星胜地，但很多人不知道冬天（5-8月）有机会看到南极光Aurora Australis！我在Tekapo蹲了三天终于拍到了粉色+绿色的光柱。条件：KP值5以上+晴天+南边无云+无月光。用Aurora Forecast APP监测KP值。拍摄点推荐：好牧人教堂（经典前景）、Lake Pukaki南岸（湖水+极光倒影）、Mt John山顶（高海拔视野开阔）。参数：ISO 3200-6400，f/2.8或更大，快门10-15秒。南极光比北极光更罕见，拍到就是人生照片！Tekapo的极光季刚好是观星的淡季，人少房价还便宜。', aiSummary: JSON.stringify({ locations: ['蒂卡波湖', 'Lake Pukaki', 'Mt John'], activities: ['南极光拍摄', 'Aurora Australis', '冬季追光', '好牧人教堂极光', 'Mt John观星'], duration: '3天', budget: '$500', season: '冬季5-8月', transport: '自驾', keyTips: ['KP值5以上才可见', 'Aurora Forecast APP监测', '好牧人教堂是最佳前景', '冬天极光季房价便宜'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/aurora-tekapo","https://loremflickr.com/300/400/aurora-australis"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=tekapo%E6%9E%81%E5%85%89', sourcePlatform: '小红书', likes: 8760, saves: 4200, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-07-02') },

    { routeId: r2.id, authorName: '雪山咖啡馆老板', authorAvatar: '', title: 'Mt Cook Village生存指南：唯一超市、最便宜餐厅、加油站', rawContent: 'Mt Cook Village常住人口只有200人，所有设施都在Hermitage酒店周边500米内。实用信息：1.唯一的小超市在Hermitage里，东西比山下贵30%，建议在Tekapo的Four Square提前买好补给。2.最便宜的餐厅是Old Mountaineers Cafe（汉堡$22+热巧克力$6），比Hermitage的自助$65便宜太多。3.没有加油站！最近的在Tekapo 100公里外，进山前一定加满油。4.手机信号只有Spark有，Vodafone/Eye基本无服务。5.Hooker Valley步道停车场8点后就满了，夏天建议7点前到。6.The Hermitage的公共区域可以免费坐，大厅壁炉旁喝咖啡看雪山很惬意（不用住也能进）。', aiSummary: JSON.stringify({ locations: ['库克山'], activities: ['Mt Cook Village生存指南', '超市补给', '最便宜餐厅', '加油站提醒', '手机信号', '停车建议'], duration: '1-2天', budget: '$100', season: '全年', transport: '自驾', keyTips: ['Tekapo提前买好补给', '没有加油站最近在Tekapo', '只有Spark有信号', '夏天Hooker Valley停车场8点满'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/mt-cook-village","https://loremflickr.com/300/400/hermitage-lobby"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%BA%93%E5%85%8B%E5%B1%B1%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 5670, saves: 2800, comments: 378, status: 'auto_published', sourcePublishedAt: new Date('2025-02-05') },

    // ── R3 South Island Loop additional (5 new) ──
    { routeId: r3.id, authorName: '自驾女司机🚗', authorAvatar: '', title: '南岛7天自驾每天开多久？附详细里程和时间表', rawContent: '南岛环线7天自驾详细里程：Day1基督城→Tekapo 227km/3h（SH1+SH79+SH8路况好）。Day2 Tekapo→Mt Cook 105km/1.5h（SH80沿着Lake Pukaki开，每个观景台都值得停）。Day3 Mt Cook→Wanaka 208km/2.5h（经Lindis Pass最高点971m）。Day4 Wanaka→皇后镇 68km/1h（Crown Range公路弯多限速40）。Day5皇后镇→Milford Sound 287km/4h（但其实不建议自己开，山路+隧道太累）。Day6皇后镇→基督城 482km/6h（最长的一天，建议中间停Tekapo）。全程约1400km，租车油费约$200-250。个人感觉最适合的节奏是7天起，10天更从容。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '库克山', '瓦纳卡', '皇后镇', '米尔福德峡湾'], activities: ['自驾里程详解', 'SH8/80路况', 'Lindis Pass', 'Crown Range', '加油提醒'], duration: '7天', budget: '$250', season: '全年', transport: '自驾', keyTips: ['全程1400km油费$200-250', 'Milford不建议自驾太累', '最长一天482km/6h', '7天起10天更从容'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/nz-road-trip","https://loremflickr.com/300/400/nz-highway"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%8D%97%E5%B2%9B%E8%87%AA%E9%A9%BE%E9%87%8C%E7%A8%8B', sourcePlatform: '小红书', likes: 6540, saves: 3100, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-01-30') },

    { routeId: r3.id, authorName: '胶片情侣档📷💕', authorAvatar: '', title: '南岛10天胶片记录：这些地方比网红机位更出片', rawContent: '和男朋友带了5卷Portra 400在南岛拍了10天。网红机位人多排队体验差，发现几个替代机位更出片：1.不去好牧人教堂（排队20分钟）→改去Lake Pukaki南岸，同样的奶蓝湖水+Aoraki雪山但空无一人。2.不去孤独的树（一堆人围着拍）→改去Glendhu Bay栈桥，更原始且背景更壮。3.不去Skyline观景台→改去Queenstown Hill徒步30分钟有个天然石框拍Wakatipu湖。4.Arrowtown不去主街→改去Arrow River步道沿河拍秋色。5.Lake Hawea比Wanaka更野更蓝，完全没人。胶片拍摄tip：新西兰紫外线强，Portra 400过曝一档色彩更柔和。', aiSummary: JSON.stringify({ locations: ['蒂卡波湖', '瓦纳卡', '皇后镇', '箭镇', 'Lake Hawea'], activities: ['胶片摄影', '替代机位', 'Portra 400', 'Lake Pukaki南岸', 'Glendhu Bay', 'Queenstown Hill'], duration: '10天', budget: '$2000', season: '秋季', transport: '自驾', keyTips: ['Lake Pukaki南岸替代好牧人教堂', 'Glendhu Bay替代孤独的树', 'Portra 400过曝一档', 'Arrow River替代主街'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/film-nz","https://loremflickr.com/300/400/portra-400-nz"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%8D%97%E5%B2%9B%E8%83%B6%E7%89%87', sourcePlatform: '小红书', likes: 5430, saves: 2500, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-04-10') },

    { routeId: r3.id, authorName: '独旅女生安全手册📋', authorAvatar: '', title: '一个人自驾南岛安全吗？女生独旅10条保命指南', rawContent: '一个人（女生）在南岛自驾了12天，来分享安全经验：1.租车选大公司（Hertz/Avis/Europcar）不要图便宜选小公司，路上出问题有24小时救援。2.下载离线地图！南岛很多地方没信号（尤其是Milford Road和West Coast）。3.加油站间隔远，油表到一半就加不要赌。4.晚上不要开夜车，南岛没路灯+可能有动物横穿。5.住宿选评分9.0以上的青旅/民宿，看评价里是否有"solo female friendly"。6.徒步一定要填intentions book（步道入口的登记本），告诉别人你走哪条路几点回来。7.买个PLB（个人定位信标）可以租$40/周。8.新西兰总体上非常安全，民风淳朴。但基本的独旅安全意识还是要有。独自旅行反而更自由，想停就停。', aiSummary: JSON.stringify({ locations: ['南岛'], activities: ['女生独旅安全', '租车建议', '离线地图', '住宿选择', '徒步安全', 'PLB信标'], duration: '按需', budget: '按需', season: '全年', transport: '自驾', keyTips: ['租大公司有24h救援', '下载离线地图', '油表一半就加', '徒步填intentions book', 'PLB可租$40/周'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/solo-female-travel","https://loremflickr.com/300/400/nz-safety"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E7%8B%AC%E6%97%85%E5%AE%89%E5%85%A8', sourcePlatform: '小红书', likes: 12300, saves: 5800, comments: 890, status: 'auto_published', sourcePublishedAt: new Date('2025-03-05') },

    { routeId: r3.id, authorName: '数字游民小卡💻', authorAvatar: '', title: '在南岛边工作边旅行：网速、咖啡店、Co-working全测评', rawContent: '在皇后镇和Wanaka远程工作了2周，数字游民视角测评：网速-皇后镇大部分酒店Wifi 50Mbps+，但Mt Cook和Tekapo只有10Mbps基本只能发邮件。咖啡店办公-皇后镇Bespoke Kitchen（Wifi免费不限时）、Wanaka的Fusion Cafe（有专门的工作大桌）。Co-working-皇后镇The Hub（$25/天$80/周，有会议室+打印机）。最佳工作节奏-上午工作下午出去玩（新西兰比国内早4-5小时，国内上午刚好我下午）。视频会议-Spark信号最好。总结：皇后镇是最适合数字游民的南岛城市，其他地方更适合度假而不是工作。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡', '库克山', '蒂卡波湖'], activities: ['数字游民', '远程工作', '网速测评', 'Co-working', '咖啡店办公'], duration: '2周', budget: '$1500', season: '全年', transport: '自驾', keyTips: ['皇后镇网速50Mbps+', 'Mt Cook网速仅10Mbps', 'The Hub $25/天', '比国内早4-5小时'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/digital-nomad-nz","https://loremflickr.com/300/400/coworking-queenstown"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%95%B0%E5%AD%97%E6%B8%B8%E6%B0%91', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 289, status: 'auto_published', sourcePublishedAt: new Date('2025-05-20') },

    { routeId: r3.id, authorName: '雨天旅行者☔', authorAvatar: '', title: '南岛连下7天雨怎么办？雨天Plan B全攻略', rawContent: '在新西兰遇到连续雨天不要慌！南岛雨天备选方案：1.皇后镇Onsen Hot Pools-有顶棚下雨更浪漫，山间雨雾缭绕像仙境。2.Gibbston Valley酒庄-洞穴酒窖品酒全程室内。3.Arrowtown湖区博物馆-免费了解淘金史。4.Wanaka Puzzling World-迷宫+倾斜屋全室内。5.Tekapo Springs-雨中泡温泉看湖景。6.基督城Canterbury Museum-免费+内容丰富。7.Milford Sound其实雨天更壮观！瀑布从每面悬崖倾泻。8.室内活动备选：iFLY室内跳伞（$99）、Fear Factory鬼屋（$30）。关键心态：新西兰的雨来去都快，带好防水装备继续玩。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡', '基督城', '米尔福德峡湾'], activities: ['雨天备选方案', 'Onsen温泉', '酒庄品酒', 'Puzzling World', '博物馆', 'Milford雨天'], duration: '按需', budget: '$100-300', season: '全年', transport: '自驾', keyTips: ['Milford雨天更壮观', 'Onsen温泉有顶棚', 'Gibbston酒庄室内', '新西兰雨来去都快'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/rainy-nz","https://loremflickr.com/300/400/onsen-rainy"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E9%9B%A8%E5%A4%A9', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 367, status: 'auto_published', sourcePublishedAt: new Date('2025-06-10') },

    // ── R4 North Island additional (4 new) ──
    { routeId: r4.id, authorName: '毛利文化研究员🎭', authorAvatar: '', title: 'Rotorua不止地热！毛利文化深度体验：Hangi大餐+Haka战舞', rawContent: '来Rotorua三次，每次都有新发现。毛利文化深度体验：Te Puia除了看间歇泉，一定要订晚间体验（$120含Hangi大餐+Haka战舞表演+夜游地热谷）。Hangi是用地热蒸熟的食物（鸡肉+猪肉+红薯+南瓜），味道有点像清蒸+烟熏的混合。Haka战舞看着看着会起鸡皮疙瘩，那种原始的力量感太震撼了。Whakarewarewa Living Maori Village（$40）比Te Puia更原生态，是真正有毛利人居住的村庄，导游都是村民本人。Mitai Maori Village（$110）有独木舟Waka表演+萤火虫丛林步道。不要只去地热公园打卡就走，毛利文化是北岛最核心的体验。', aiSummary: JSON.stringify({ locations: ['罗托鲁瓦'], activities: ['毛利文化', 'Hangi大餐', 'Haka战舞', 'Te Puia晚间体验', 'Whakarewarewa村庄', 'Mitai毛利村'], duration: '2天', budget: '$250', season: '全年', transport: '自驾', keyTips: ['Te Puia晚间体验最丰富', 'Hangi地热蒸食物', 'Whakarewarewa更原生态', '不要只打卡地热就走'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/maori-culture","https://loremflickr.com/300/400/haka-dance"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%AF%9B%E5%88%A9%E6%96%87%E5%8C%96%E4%BD%93%E9%AA%8C', sourcePlatform: '小红书', likes: 4560, saves: 2200, comments: 312, status: 'auto_published', sourcePublishedAt: new Date('2025-05-15') },

    { routeId: r4.id, authorName: '魔戒十年老粉🎬', authorAvatar: '', title: '霍比屯深度游：不只是打卡，这些细节90%的人都会错过', rawContent: '去了三次霍比屯的指环王老粉来分享隐藏细节：1.那颗橡树是假的！每片叶子都是手工制作的塑料叶子，一共25万片。2.Bag End上面那棵树是新西兰本土铁心木，和电影里不一样（电影里是橡树）。3.面包店门口的面包是树脂做的，而且真的在冒烟！4.Green Dragon Inn有四种独家啤酒：Southfarthing Amber、Stout、Cider、Ginger Beer，外面买不到。5.磨坊后面有条秘密小径导览员一般不会主动走，可以要求去看看。6.下午4点以后的团光线最好，霍比特洞的门朝西，下午才有阳光打在彩色门上。7.纪念品店的Southfarthing啤酒杯$25是性价比最高的周边。', aiSummary: JSON.stringify({ locations: ['霍比屯'], activities: ['指环王深度游', '隐藏细节', 'Green Dragon Inn', '独家啤酒', '最佳光线时间'], duration: '半天', budget: '$89-150', season: '全年', transport: '自驾/一日游', keyTips: ['橡树是假的有25万片塑料叶', '独家啤酒外面买不到', '下午4点阳光最好', 'Southfarthing啤酒杯$25'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/hobbiton-detail","https://loremflickr.com/300/400/green-dragon-inn"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E9%9C%8D%E6%AF%94%E5%B1%AF%E6%B7%B1%E5%BA%A6', sourcePlatform: '小红书', likes: 9870, saves: 4600, comments: 678, status: 'auto_published', sourcePublishedAt: new Date('2025-02-14') },

    { routeId: r4.id, authorName: '北岛公路旅人🛣️', authorAvatar: '', title: '北岛小众路线：Coromandel半岛+热水沙滩+Cathedral Cove', rawContent: '如果北岛只去霍比屯和Rotorua就太亏了！强烈推荐Auckland往东2小时到Coromandel半岛。Hot Water Beach：退潮时在沙滩上挖个坑就有热水冒出来（免费！自带铲子或旁边租$5），躺在自己挖的温泉池里看海太爽了。Cathedral Cove：走路30分钟穿过原始森林到达天然石灰岩拱门+白沙滩，《纳尼亚传奇》取景地。Hahei Beach：比Cathedral Cove人少，沙滩一样白但更安静。最佳行程：早上Hot Water Beach挖温泉 → 下午Cathedral Cove徒步 → 傍晚Hahei看日落。整个Coromandel一天下来完全不输南岛。', aiSummary: JSON.stringify({ locations: ['Coromandel', 'Hot Water Beach', 'Cathedral Cove', 'Hahei'], activities: ['Hot Water Beach挖温泉', 'Cathedral Cove徒步', '纳尼亚取景地', 'Coromandel半岛'], duration: '1-2天', budget: '$100', season: '夏季', transport: '自驾', keyTips: ['自带铲子挖温泉', '退潮时Hot Water Beach才有热水', 'Cathedral Cove走路30分钟', 'Coromandel不输南岛'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/hot-water-beach","https://loremflickr.com/300/400/cathedral-cove"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=coromandel%E5%8D%8A%E5%B2%9B', sourcePlatform: '小红书', likes: 6540, saves: 3100, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-01-15') },

    { routeId: r4.id, authorName: '骑行新西兰🚲', authorAvatar: '', title: 'Taupo湖骑行+Huka Falls：北岛最被低估的一日游', rawContent: '从Rotorua往南1小时到Taupo，这个湖比新加坡面积还大！最佳玩法是租自行车（$35/天）环湖骑行。沿途风景：雪山背景+蓝湖+黑天鹅。Huka Falls虽然落差只有11米但水量惊人——每秒22万升水从狭窄峡谷冲下去，那个水的蓝色太魔幻了。瀑布旁边有免费步道10分钟走到最佳观景台。还可以坐Huka Falls Jet（$125）从水面近距离感受激流。Taupo湖边有免费的地热温泉溪流（Spa Park往下走到河边的Hot Water Stream）。Taupo比Rotorua人少很多，适合喜欢安静的人。从Taupo到Tongariro只要1.5小时，是徒步前的最佳落脚点。', aiSummary: JSON.stringify({ locations: ['陶波湖', 'Huka Falls'], activities: ['湖畔骑行', 'Huka Falls', '喷射快艇', '免费温泉溪', '陶波湖'], duration: '1天', budget: '$150', season: '全年', transport: '自驾+自行车', keyTips: ['湖比新加坡大', 'Huka Falls水量惊人', '免费温泉溪在Spa Park', 'Taupo比Rotorua安静'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/taupo-lake","https://loremflickr.com/300/400/huka-falls"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E9%99%B6%E6%B3%A2%E6%B9%96%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-03-18') },

    // ── R5 Grand Traverse additional (3 new) ──
    { routeId: r5.id, authorName: '穷游不是苦行僧', authorAvatar: '', title: '南北岛14天$3500搞定！每一笔花费都记下来了', rawContent: '两周南北岛穿越精确记账：机票-悉尼基督城往返$480（Jetstar促销）+ 基督城飞奥克兰$120（纽航）=$600。租车-南岛7天$280（Economy Car Rentals）+ 北岛5天$200=$480/2人=$240/人。住宿-全程青旅+Airbnb混合，平均$35/晚×13晚=$455。吃饭-超市采购自己煮70%+偶尔外食30%，$25/天×14=$350。活动-Milford Sound游船$65、Wanaka Puzzling World$25、Huka Falls Jet$125、其他免费徒步=$500。其他-油费$180/人、保险$50、纪念品$70。总计$2500/人不含机票，含机票$3100。省钱关键是多人出行AA、多利用免费活动、超市自炊。', aiSummary: JSON.stringify({ locations: ['基督城', '蒂卡波湖', '皇后镇', '米尔福德峡湾', '奥克兰', '罗托鲁瓦'], activities: ['精确记账', '省钱攻略', '多人AA', '超市自炊', '免费徒步'], duration: '14天', budget: '$3100含机票', season: '夏季', transport: '租车+飞机', keyTips: ['Jetstar促销机票$480', '多人出行AA最省', '超市自炊省一半', '免费活动占70%'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/budget-travel","https://loremflickr.com/300/400/backpacker-meal"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E7%A9%B7%E6%B8%B8%E8%AE%B0%E8%B4%A6', sourcePlatform: '小红书', likes: 7890, saves: 3500, comments: 567, status: 'auto_published', sourcePublishedAt: new Date('2025-01-12') },

    { routeId: r5.id, authorName: 'Airbnb体验达人', authorAvatar: '', title: '南北岛最特别的住宿：灯塔、蒙古包、树屋都住了个遍', rawContent: '新西兰特色住宿体验：1.Wanaka的大篷车Airbnb（$120/晚）-改装复古大篷车停在私人农场里，窗外就是雪山。2.Tekapo的玻璃屋SkyScape（$350/晚）-全透明屋顶躺床上看星空，比Dark Sky Project还震撼。3.Coromandel的蒙古包（$85/晚）-在森林里的蒙古包，旁边是小溪。4.Kaikoura的灯塔keeper\'s cottage（$180/晚）-真正的灯塔小屋，窗外海豹在礁石上睡觉。5.Central Otago的树屋（$200/晚）-建在老橡树上，秋天时被金黄葡萄园环绕。这些住宿本身就成了旅行的高光时刻！提前1-2个月订，特别抢手。', aiSummary: JSON.stringify({ locations: ['瓦纳卡', '蒂卡波湖', '科罗曼德尔', '凯库拉', '中奥塔哥'], activities: ['特色住宿', 'SkyScape玻璃屋', '复古大篷车', '蒙古包', '灯塔小屋', '树屋'], duration: '14天', budget: '$2500', season: '全年', transport: '自驾', keyTips: ['SkyScape提前2个月订', '大篷车$120/晚性价比高', '灯塔小屋看海豹', '特色住宿本身是景点'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/skyscape-tekapo","https://loremflickr.com/300/400/caravan-wanaka"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E7%89%B9%E8%89%B2%E4%BD%8F%E5%AE%BF', sourcePlatform: '小红书', likes: 6540, saves: 3200, comments: 456, status: 'auto_published', sourcePublishedAt: new Date('2025-04-08') },

    { routeId: r5.id, authorName: '时差战士😴', authorAvatar: '', title: '新西兰和澳洲有时差吗？跨塔斯曼旅行避坑指南', rawContent: '很多人以为新西兰和澳洲很近没有时差，大错特错！新西兰比悉尼/墨尔本早2小时（夏令时）。比如悉尼中午12点，新西兰下午2点。这导致：1.从澳洲飞新西兰"损失"2-3小时，下午出发的航班到了已经晚上了。2.返回澳洲时又"赚回"时间，但会搞乱生物钟。3.订Tour一定要确认是新西兰当地时间。4.新西兰的夏令时和澳洲不同步（NZ 9月-4月，AUS 10月-4月）。另外跨Tasman航班行李额比国内航班少（Jetstar只给7kg手提），超重费$15/kg很贵。建议买纽航含行李的票，价格差不多但含23kg托运+餐食。', aiSummary: JSON.stringify({ locations: ['新西兰', '澳洲'], activities: ['时差避坑', '跨塔斯曼航班', '行李额', '夏令时差异'], duration: '按需', budget: '按需', season: '全年', transport: '飞机', keyTips: ['NZ比AUS早2小时', 'Jetstar手提仅7kg', '买纽航含行李的票', '夏令时不同步须注意'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/tasman-flight","https://loremflickr.com/300/400/new-zealand-timezone"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%97%B6%E5%B7%AE', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-02-28') },

    // ═══ Batch 2: more posts for R6-R11 + general ═══

    // ── R6 Skiing additional (3 new) ──
    { routeId: r6.id, authorName: '单板菜鸟日记🏂', authorAvatar: '', title: 'Cardrona vs Remarkables vs Treble Cone：南岛三大雪场终极横评', rawContent: '在皇后镇滑了三个雪季，三大雪场横评：Cardrona-最适合新手和中级，雪道宽且长，公园设施南岛最佳，有单独的初学者区缆车。缺点是海拔低雪质偶尔偏湿。Remarkables-风景最佳，可以边滑边看Wakatipu湖，中级道多且有趣。缺点是风口多，山顶拖牵容易停运。Treble Cone（Wanaka方向）-南岛最大垂直落差705m，黑道占比最高45%，适合高手。风景无敌俯瞰Wanaka湖。缺点是不适合新手，雪场离Wanaka30分钟。费用：雪票$119-149/天，Multi-day pass划算。交通：Cardrona和Remarkables都有皇后镇出发的巴士$25往返。', aiSummary: JSON.stringify({ locations: ['皇后镇', '瓦纳卡'], activities: ['雪场横评', 'Cardrona', 'Remarkables', 'Treble Cone', '滑雪攻略'], duration: '3-7天', budget: '$500-1500', season: '冬季', transport: '雪场巴士', keyTips: ['Cardrona新手首选', 'Remarkables风景最好', 'Treble Cone高手专属', 'multi-day pass更划算'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/cardrona-snow","https://loremflickr.com/300/400/remarkables-view"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E9%9B%AA%E5%9C%BA%E6%A8%AA%E8%AF%84', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 378, status: 'auto_published', sourcePublishedAt: new Date('2025-07-12') },

    { routeId: r6.id, authorName: '澳洲滑雪教练⛷️', authorAvatar: '', title: '新西兰滑雪到底比澳洲好多少？在两边都滑过的人说实话', rawContent: '在Perisher和Cardrona都滑过的对比：雪质-新西兰粉雪天气更多，澳洲经常冰面+人造雪。价格-新西兰雪票$119-149/天vs澳洲$180-220/天，新西兰便宜30%+。雪道-澳洲雪场更大（Perisher/Thredbo），但雪质输新西兰。交通-从悉尼到Perisher开车5小时，但从皇后镇到Cardrona只要40分钟。住宿-新西兰选择更多从$35青旅到$1200奢华。总结：追求雪质和性价比选新西兰，追求雪场规模选澳洲。最完美的组合：6-7月澳洲滑（早雪季便宜）→8月新西兰滑（正雪季雪质最佳）。', aiSummary: JSON.stringify({ locations: ['皇后镇', 'Cardrona', 'Remarkables'], activities: ['新西兰vs澳洲滑雪', '雪质对比', '价格对比', '雪场规模', '最佳滑雪时间'], duration: '按需', budget: '$800-2000', season: '冬季', transport: '飞机+巴士', keyTips: ['新西兰比澳洲便宜30%', '新西兰雪质更好', '澳洲雪场规模更大', '8月新西兰雪质最佳'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/nz-ski-compare","https://loremflickr.com/300/400/perisher-vs-cardrona"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A%E6%BB%91%E9%9B%AA', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 312, status: 'auto_published', sourcePublishedAt: new Date('2025-08-02') },

    { routeId: r6.id, authorName: '不滑雪星人', authorAvatar: '', title: '陪朋友去滑雪但我不会滑！皇后镇冬季非滑雪攻略', rawContent: '朋友来新西兰滑雪但我是零基础+怕摔，却发现冬天的皇后镇即使不滑雪也好玩到爆：1.Onsen Hot Pools-冬天泡温泉最有感觉，外面下雪池里暖和。2.雪场咖啡厅-陪滑的人可以坐缆车上山（$45往返），山顶咖啡厅看雪山喝热巧克力。3.Arrowtown冬天-被雪山环绕的历史小镇+热派+热红酒。4.Gibbston Valley酒庄-冬天洞穴酒窖品酒特别cozy。5.冰吧Minus 5-零下5度的冰吧用冰做的杯子喝鸡尾酒$25。6.湖边雪景散步-冬天Wakatipu湖+雪山背景散步比夏天更梦幻（人少）。总结：冬天皇后镇即使不滑雪也是童话世界。', aiSummary: JSON.stringify({ locations: ['皇后镇', '箭镇', 'Gibbston Valley'], activities: ['非滑雪冬季', 'Onsen温泉', '雪场咖啡厅', '冰吧', '冬季酒庄', '湖边雪景'], duration: '3-5天', budget: '$400', season: '冬季', transport: '巴士+步行', keyTips: ['缆车上山不滑雪也能看雪景', 'Minus 5冰吧$25', '冬天Arrowtown人少超美', '冬天酒店比夏天便宜'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/queenstown-winter","https://loremflickr.com/300/400/onsen-winter"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%86%AC%E5%A4%A9%E7%9A%87%E5%90%8E%E9%95%87', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-07-28') },

    // ── R7 Fiordland additional (3 new) ──
    { routeId: r7.id, authorName: '峡湾摄影师🌊', authorAvatar: '', title: 'Milford Sound拍摄全攻略：什么时间、什么位置、什么焦段', rawContent: 'Milford Sound摄影攻略：最佳时间-清晨第一班船9:00，游客最少+水面最平静。第二选择是最后一班16:00的船，日落光线+金色瀑布。焦段-广角16-35mm拍全景（Mitre Peak+海峡），长焦70-200mm拍瀑布细节+海豹+海豚。机位-船头甲板最前拍全景，船尾拍船驶离码头的经典构图，中层甲板侧面拍瀑布近距离（会被淋湿保护好相机）。特效-用ND1000滤镜拍瀑布丝绸效果2-4秒长曝光。雨后是最佳拍摄时机-瀑布更多+云雾缭绕+水面更绿。保护-带防水罩！瀑布水流大+船上浪花，相机不保护好就废了。', aiSummary: JSON.stringify({ locations: ['米尔福德峡湾'], activities: ['摄影攻略', '广角+长焦', '雨后拍摄', 'ND滤镜', '防水保护', '最佳船班'], duration: '1天', budget: '$65-140船票', season: '全年', transport: '一日游巴士/自驾', keyTips: ['第一班9:00船人最少', '雨后瀑布更壮观', '带防水罩保护相机', '广角+长焦双机最好'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/milford-photography","https://loremflickr.com/300/400/milford-waterfall"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=milford%20sound%E6%8B%8D%E6%91%84', sourcePlatform: '小红书', likes: 6540, saves: 3100, comments: 432, status: 'auto_published', sourcePublishedAt: new Date('2025-03-22') },

    { routeId: r7.id, authorName: 'Te Anau居民', authorAvatar: '', title: 'Te Anau才是南岛宝藏！在峡湾门户住了3个月的全攻略', rawContent: '在Te Anau住了3个月的深度体验：这个小镇只有2000人口但体验密度超高。日常-每天湖边晨跑看晨雾散去，傍晚湖边看日落（夏天9点半才黑）。美食-Miles Better Pies的鹿肉派$8是隐藏王者、Redcliff Cafe的羊肉$38、Sandfly Cafe的flat white$5。活动清单-萤火虫洞$75（不可错过）、Kepler Track一日段免费、Lake2Lake自行车道免费、Te Anau Bird Sanctuary免费看Takahe鸟（全世界只有500只）。住宿-Barnyard Backpackers$35有免费spa。Te Anau是那种"不想在社交媒体上告诉别人"的宝藏小镇。', aiSummary: JSON.stringify({ locations: ['蒂阿瑙'], activities: ['湖畔生活', 'Miles Better Pies', '萤火虫洞', 'Kepler Track', 'Bird Sanctuary'], duration: '2-3天', budget: '$300', season: '全年', transport: '自驾', keyTips: ['Miles Better Pies鹿肉派$8', 'Barnyard Backpacker有免费spa', '免费看Takahe濒危鸟', '比皇后镇便宜一半'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/te-anau-town","https://loremflickr.com/300/400/te-anau-sunset"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=te%20anau%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 289, status: 'auto_published', sourcePublishedAt: new Date('2025-04-12') },

    { routeId: r7.id, authorName: '追海豚的凯瑟琳🐬', authorAvatar: '', title: 'Doubtful Sound vs Milford Sound：双峡湾都去了的真实对比', rawContent: '两个峡湾都去了，客观对比：Milford-更容易到达（皇后镇一日游$65-140），Mitre Peak标志性垂直山体更震撼，瀑布更多更密集。缺点是人多（每天2000+游客）。Doubtful Sound-需要从Manapouri湖坐船+大巴才能到（$280起），更远但更野更安静。3倍大于Milford，水面更宽阔，野生动物更多（看到海豹群+企鹅+宽吻海豚的几率更高）。因为游客少（每天限量450人），体验更私密。总结：第一次来新西兰选Milford（经典+性价比），如果追求深度+安静选Doubtful（更贵但更原生态）。两个都值，风格不同。', aiSummary: JSON.stringify({ locations: ['米尔福德峡湾', '神奇峡湾', 'Manapouri'], activities: ['双峡湾对比', 'Milford vs Doubtful', '野生动物', '游客量比较', '性价比分析'], duration: '2天', budget: '$350', season: '全年', transport: '巴士+船', keyTips: ['Milford第一次首选', 'Doubtful更安静野生', 'Doubtful每天限450人', 'Doubtful海豚几率更高'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/doubtful-sound","https://loremflickr.com/300/400/milford-vs-doubtful"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E7%A5%9E%E5%A5%87%E5%B3%A1%E6%B9%BE', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 367, status: 'auto_published', sourcePublishedAt: new Date('2025-02-08') },

    // ── R8 West Coast additional (3 new) ──
    { routeId: r8.id, authorName: '冰川对比控', authorAvatar: '', title: 'Franz Josef vs Fox Glacier vs Tasman：三大冰川怎么选', rawContent: '新西兰三大冰川体验横评：Franz Josef-最容易到达，直升机+徒步$450，冰洞+冰裂缝经典。镇上设施齐全餐厅多。Fox Glacier-比Franz Josef更野生，Lake Matheson镜面倒影是隐藏王炸。Tasman Glacier（Mt Cook）-新西兰最长冰川29km，可以从Hooker Valley远眺（免费），也可以直升机$450。综合推荐：预算有限选Tasman（免费步道也能看到），追求冰洞+蓝冰选Franz Josef，追求安静+摄影选Fox Glacier。重要提醒-冰川直升机受天气影响大，夏季成功率70%，冬季50%。预留备用日期！', aiSummary: JSON.stringify({ locations: ['Franz Josef', 'Fox冰川', '库克山'], activities: ['三大冰川对比', '直升机徒步', 'Lake Matheson', 'Tasman Glacier', '冰川选择建议'], duration: '2-3天', budget: '$0-450', season: '夏季', transport: '自驾', keyTips: ['Tasman免费步道也能看', 'Franz Josef冰洞最经典', 'Fox Glacier最安静', '预留备用日期天气很重要'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/franz-josef-ice","https://loremflickr.com/300/400/tasman-glacier"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E5%86%B0%E5%B7%9D%E5%AF%B9%E6%AF%94', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 378, status: 'auto_published', sourcePublishedAt: new Date('2025-01-22') },

    { routeId: r8.id, authorName: '西海岸土著🦟', authorAvatar: '', title: '西海岸Sandfly生存指南：这种小虫比任何景点都让人难忘', rawContent: '西海岸自然风光绝美，但Sandfly（沙蝇）能把人逼疯！防虫攻略：1.必须用含DEET 40%+的防蚊液，超市普通防蚊液对sandfly无效。2.最好穿长袖长裤，浅色（sandfly被深色吸引）。3.不要站在水边不动，sandfly在水边和阴天最活跃。4.被咬了不要挠！越挠越痒，涂Tiger Balm或Antihistamine药膏。5.风大的时候sandfly减少（飞不动）。6.中午日照最强时sandfly减少。7.防蚊头网看着好笑但真的管用。如果选一样只能带的东西去西海岸——不是相机是防蚊液。', aiSummary: JSON.stringify({ locations: ['西海岸', 'Franz Josef', 'Hokitika'], activities: ['防蚊指南', 'Sandfly生存', 'DEET防蚊液', '最佳穿着', '止痒方法'], duration: '按需', budget: '$20', season: '全年', transport: '自驾', keyTips: ['DEET 40%+才有效', '穿浅色长袖', '水边不要站着不动', 'Tiger Balm止痒最有效'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/sandfly-warning","https://loremflickr.com/300/400/west-coast-insect"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E8%A5%BF%E6%B5%B7%E5%B2%B8%E6%B2%99%E8%9D%87', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-01-05') },

    { routeId: r8.id, authorName: '公路旅行诗人🚗', authorAvatar: '', title: 'Arthur\'s Pass：新西兰最美高山公路，每一弯都是一个风景', rawContent: 'Arthur\'s Pass（SH73）连接基督城和西海岸，是新西兰海拔最高的高山公路（920m）。沿途必停：1.Castle Hill-巨大石灰岩散落在草甸上像天然雕塑群，《纳尼亚传奇》取景地，拍照最佳时间是日出后1小时。2.Cave Stream-可以溯溪穿越的地下暗河（免费，带手电筒！）。3.Arthur\'s Pass Village-小村只有50人，高山鹦鹉Kea经常飞到停车场找食物（不要喂！）。4.Devils Punchbowl Falls-步行30分钟到131m高瀑布。5.Otira Viaduct-盘旋高架桥工程奇迹。全程基督城到Hokitika 250km/4小时，但建议留出6-7小时每个点都停。', aiSummary: JSON.stringify({ locations: ['Arthur\'s Pass', 'Castle Hill', 'Hokitika'], activities: ['高山公路', '纳尼亚取景地', 'Cave Stream', 'Devils Punchbowl', 'Kea鹦鹉', 'Otira高架桥'], duration: '1天', budget: '$50', season: '全年', transport: '自驾', keyTips: ['Castle Hill日出后最美', 'Cave Stream带手电', '不要喂Kea鹦鹉', '全程多留2-3小时停靠'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/arthurs-pass","https://loremflickr.com/300/400/castle-hill-nz"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=arthurs%20pass%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 4320, saves: 2100, comments: 289, status: 'auto_published', sourcePublishedAt: new Date('2025-02-22') },

    // ── R9 Kaikoura additional (2 new) ──
    { routeId: r9.id, authorName: '海洋生物学家👩‍🔬', authorAvatar: '', title: 'Kaikoura为什么有这么多鲸鱼？海底地形解密+观鲸季节指南', rawContent: 'Kaikoura观鲸成功率70%+的秘密在于海底地形：离岸500米就是Kaikoura Canyon，1000米深的海沟遇到大陆架急升，上升流把深海营养物质带上来→浮游生物多→鱼多→鲸鱼多。抹香鲸全年可见（它们不迁徙），座头鲸6-7月迁徙季，蓝鲸12-3月偶见。最佳观鲸时间：夏天12-3月（海况最好浪小），冬天6-8月（座头鲸过境+雪山顶背景更美）。观鲸团选早上8点的（风小浪小成功率最高）。如果晕船：出发前1小时吃晕船药，站在船下层比上层晃得少。观鲸+海豚+Seal Swim可以买combo pass $320省$50。', aiSummary: JSON.stringify({ locations: ['凯库拉'], activities: ['海底地形', '观鲸季节', '抹香鲸', '座头鲸', '晕船预防', 'Combo Pass'], duration: '1-2天', budget: '$320', season: '全年', transport: '自驾', keyTips: ['抹香鲸全年可见', '夏天浪小成功率最高', '早上8点船风最小', 'combo pass $320省$50'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/kaikoura-whale","https://loremflickr.com/300/400/kaikoura-canyon"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=kaikoura%E8%A7%82%E9%B2%B8%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 378, status: 'auto_published', sourcePublishedAt: new Date('2025-03-15') },

    { routeId: r9.id, authorName: '葡萄酒小白🍷', authorAvatar: '', title: 'Marlborough酒庄自行车一日游：不懂酒也能玩得很开心', rawContent: '完全不懂葡萄酒但Marlborough酒庄骑行是我在新西兰最快乐的一天！从Blenheim租自行车（$35/天含地图），酒庄之间骑行15-30分钟，沿途全是葡萄园+远山。Wither Hills有免费的cellar door讲解（10分钟就能了解Sauvignon Blanc为什么是NZ之光）。Cloudy Bay比Wither Hills更商业化但花园美。最惊喜的是小酒庄像Gibson Bridge（家庭作坊），老板亲自倒酒聊葡萄园故事。不用懂酒，跟着说"这个果味比较重"就行！酒庄一般品酒$5-15，买酒的话品酒费免。品三四家刚好微醺。骑回Blenheim路上经过巧克力工厂Boutique Chocolate，手工巧克力$8/块。', aiSummary: JSON.stringify({ locations: ['布伦海姆', 'Marlborough'], activities: ['酒庄骑行', 'Sauvignon Blanc', 'Wither Hills', 'Cloudy Bay', '巧克力工厂'], duration: '1天', budget: '$80', season: '夏秋', transport: '自行车', keyTips: ['租自行车$35/天', '品酒$5-15买酒免品酒费', '不懂酒也可以玩', '骑三四家刚好微醺'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/marlborough-bike","https://loremflickr.com/300/400/wither-hills"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=marlborough%E9%85%92%E5%BA%84%E9%AA%91%E8%A1%8C', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-02-14') },

    // ── R10 Bay of Islands additional (2 new) ──
    { routeId: r10.id, authorName: '帆船爱好者⛵', authorAvatar: '', title: '岛屿湾跳岛游：144个岛屿选哪几个？最佳海岛推荐', rawContent: '岛屿湾跳岛指南：Urupukapuka Island（最佳一日游岛）-渡轮$45，岛上有5条步道从1小时到3小时，最高点看全岛湾360度景观。Motuarohia Island（双泻湖岛）-两个天然泻湖通过窄水道连海，浮潜绝佳。Roberton Island（心形泻湖岛）-步行15分钟到观景台俯瞰心形泻湖，ins最热门。Russell（历史半岛）-新西兰第一个首都，Duke of Marlborough Hotel吃午餐（百年老酒店 waterfront）。Otehei Bay（唯一有餐厅的岛）-不想带午饭的就来这。建议选Fullers GreatSights的Cream Trip一日游$139涵盖所有主要岛屿+海豚。Paihia码头早上8点出发。', aiSummary: JSON.stringify({ locations: ['岛屿湾', '派希亚', 'Russell', 'Urupukapuka', 'Motuarohia'], activities: ['跳岛游', '浮潜', '心形泻湖', 'Russell历史小镇', 'Cream Trip'], duration: '2-3天', budget: '$150', season: '夏季', transport: '渡轮+游船', keyTips: ['Cream Trip $139全包', 'Urupukapuka岛最佳一日游', 'Russell是新西兰第一个首都', '早上8点出发'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/bay-of-islands","https://loremflickr.com/300/400/urupukapuka"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%B2%9B%E5%B1%BF%E6%B9%BE%E8%B7%B3%E5%B2%9B', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-04-18') },

    { routeId: r10.id, authorName: '北岛尽头探险家', authorAvatar: '', title: 'Cape Reinga+九十英里海滩一日游：站在新西兰最北的感觉', rawContent: '从Paihia到Cape Reinga一日游全程：早上7点出发（GreatSights一日游$150或自驾3小时）。路上经过Mangonui小镇的著名Fish&Chips（Mangonui Fish Shop建在海上的木屋里，blue cod$12）。Cape Reinga灯塔-站在这里看塔斯曼海（绿色）和太平洋（深蓝）的洋流交汇线，肉眼真的能看到颜色分界！毛利人相信灵魂从这里跳入海中前往Hawaiki。九十英里海滩-大巴开在沙滩上飙车超刺激，旁边就是沙丘可以滑沙（$15租板）。回程经过Puketi Kauri Forest看2000岁的Kauri树（9个人才能合抱）。全程12小时，属于「一生一次」的体验。', aiSummary: JSON.stringify({ locations: ['Cape Reinga', '九十英里海滩', 'Mangonui'], activities: ['Cape Reinga灯塔', '塔斯曼海+太平洋交汇', '九十英里海滩', '沙丘滑沙', 'Kauri古树'], duration: '1天', budget: '$150', season: '全年', transport: '一日游巴士/自驾', keyTips: ['洋流交汇线肉眼可见', '滑沙$15租板', 'Mangonui Fish&Chips海景', '全程12小时'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/cape-reinga","https://loremflickr.com/300/400/ninety-mile-beach"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=cape%20reinga%E4%B8%80%E6%97%A5%E6%B8%B8', sourcePlatform: '小红书', likes: 4560, saves: 2200, comments: 312, status: 'auto_published', sourcePublishedAt: new Date('2025-03-28') },

    // ── R11 Central Otago additional (2 new) ──
    { routeId: r11.id, authorName: 'Pinot Noir信徒🍇', authorAvatar: '', title: '中奥塔哥Pinot Noir酒庄巡礼：Bannockburn vs Gibbston哪个好', rawContent: '中奥塔哥是世界最南端的葡萄酒产区，Pinot Noir是这里的王者。Bannockburn（Cromwell旁）-新西兰海拔最高的葡萄园，昼夜温差大葡萄皮厚单宁重。推荐：Mt Difficulty（山腰餐厅$35 mains配酒$15品）、Carrick（湖景+Pinot Noir+现烤pizza）、Felton Road（需要预约的膜拜酒庄）。Gibbston Valley（皇后镇方向）-更商业化但方便。推荐：Gibbston Valley Winery（$15品酒+免费cheese tasting+洞穴酒窖tour$20）、Kinross（五家小酒庄共用一个品酒室）。对比：Bannockburn酒更复杂更贵（$50-100/瓶），Gibbston更亲民（$25-45/瓶）。两个都值得去，风格互补。', aiSummary: JSON.stringify({ locations: ['克伦威尔', 'Gibbston Valley', 'Bannockburn'], activities: ['Pinot Noir品酒', 'Bannockburn酒庄', 'Mt Difficulty', 'Gibbston Valley', 'Carrick'], duration: '1-2天', budget: '$80', season: '夏秋', transport: '自驾', keyTips: ['Bannockburn酒更复杂', 'Gibbston更亲民', 'Felton Road须预约', 'Mt Difficulty山腰餐厅view好'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/bannockburn-wine","https://loremflickr.com/300/400/gibbston-valley"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E4%B8%AD%E5%A5%A5%E5%A1%94%E5%93%A5%E9%85%92%E5%BA%84', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-03-10') },

    { routeId: r11.id, authorName: '水果猎人🍑', authorAvatar: '', title: '中奥塔哥水果日历：樱桃只是开始！全年水果采摘时间表', rawContent: '中奥塔哥是新西兰的水果之都！全年采摘日历：12-1月樱桃（Cromwell樱桃园$10入园随便吃，Cheeki Cherries和Dam Good Fruit最推荐）。1-2月杏+桃子。2-3月李子+油桃。3-4月苹果+梨。4-5月奇异果（虽然Bay of Plenty更多）。另外Cromwell周六集市有本地蜂蜜+果酱+手工巧克力。水果采摘tip：早上8-9点去最好（凉快+水果没被摘完），带现金（很多果园不收卡），穿防晒（果园无遮挡）。中奥塔哥的气候（夏热冬冷干燥）是最适合水果生长的。从Cromwell到Roxburgh这条路是"水果公路"，路边全是果园+水果摊。', aiSummary: JSON.stringify({ locations: ['克伦威尔', 'Roxburgh'], activities: ['水果采摘', '樱桃季', '桃子杏子', '苹果梨', '周六集市'], duration: '1-2天', budget: '$30', season: '夏季', transport: '自驾', keyTips: ['樱桃季12-1月$10入园', '早上8-9点最好', '带现金很多果园不收卡', 'Cromwell-Roxburgh水果公路'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/cromwell-cherry","https://loremflickr.com/300/400/central-otago-orchard"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E4%B8%AD%E5%A5%A5%E5%A1%94%E5%93%A5%E6%B0%B4%E6%9E%9C', sourcePlatform: '小红书', likes: 3450, saves: 1670, comments: 234, status: 'auto_published', sourcePublishedAt: new Date('2025-12-05') },

    // ── General NZ travel posts (4 new) ──
    { routeId: r5.id, authorName: '新西兰移民局编外人员🛂', authorAvatar: '', title: '中国留学生新西兰签证避坑：这些材料最容易出问题', rawContent: '在澳洲的中国留学生去新西兰玩签证注意事项：1.澳洲学生签证持有者去新西兰免签！但必须带COE+护照+澳洲签证信（VEVO）打印出来，入境时移民官会查。2.如果是旅游签来澳洲的中国护照，去新西兰需要单独办NZ旅游签（$211纽币在线申请，7-15个工作日）。3.常见拒签原因：银行流水不够（建议有$5000+余额）、行程单不详细（必须每天都有住宿预订）、无返程机票。4.新西兰入境查得比澳洲更严！任何食物、水果、蜂蜜、户外装备（有泥土）必须申报。没申报被罚款$400。5.户外装备入境前洗干净，鞋底的泥土也要刷掉。', aiSummary: JSON.stringify({ locations: ['新西兰', '澳洲'], activities: ['签证攻略', '澳洲学生签免签', '旅游签办理', '海关申报', '入境避坑'], duration: '按需', budget: '$211签证费', season: '全年', transport: '', keyTips: ['澳洲学生签免签NZ', '银行余额$5000+', '入境比澳洲更严申报', '户外装备洗干净入境'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/nz-visa","https://loremflickr.com/300/400/nz-immigration"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E7%AD%BE%E8%AF%81%E6%94%BB%E7%95%A5', sourcePlatform: '小红书', likes: 9870, saves: 4600, comments: 678, status: 'auto_published', sourcePublishedAt: new Date('2025-05-05') },

    { routeId: r5.id, authorName: '手机摄影师📱', authorAvatar: '', title: '新西兰13天手机出片全攻略：iPhone也能拍出单反感', rawContent: '全程用iPhone 15 Pro拍的新西兰，回来后朋友都问用的什么相机。技巧：1.人像模式只拍人，拍风景用主摄（1x）或超广角（0.5x）。2.新西兰紫外线强，曝光补偿-0.3到-0.7，不然雪山过曝。3.Live Photo开着，后期选最佳帧（拍跳跃/瀑布/海豚时神技）。4.全景模式竖着拍！把手机横过来从下往上扫，拍出超高分辨率竖构图。5.人像模式+舞台灯光效果拍夕阳人像。6.Lightroom Mobile免费版调色足够（减高光+加阴影+加一点暖色调）。新西兰的光线太作弊了——空气干净+南半球光线角度低，随便拍都像修过的。', aiSummary: JSON.stringify({ locations: ['南岛', '皇后镇', '蒂卡波湖'], activities: ['iPhone摄影', '手机出片', 'Live Photo', '全景技巧', 'Lightroom修图'], duration: '按需', budget: '$0', season: '全年', transport: '', keyTips: ['曝光补偿-0.3到-0.7', '全景竖着拍', 'Live Photo抓动态', '新西兰光线本身就作弊'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/iphone-nz","https://loremflickr.com/300/400/nz-photo-phone"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%89%8B%E6%9C%BA%E6%8B%8D%E6%96%B0%E8%A5%BF%E5%85%B0', sourcePlatform: '小红书', likes: 7890, saves: 3400, comments: 456, status: 'auto_published', sourcePublishedAt: new Date('2025-04-25') },

    { routeId: r5.id, authorName: '带娃游世界👨‍👩‍👧', authorAvatar: '', title: '带2岁娃游新西兰：亲子游没那么难！10天南岛实测', rawContent: '带2岁女儿去了南岛10天，亲子游比想象中顺利。选对活动：蒸汽船（宝宝免费+不会晕船）、Skyline缆车（婴儿车友好）、动物园和Kiwi Birdlife Park、Arrowtown河边玩水（免费+安全）、所有平路湖畔步道（婴儿车OK）。不选的活动：蹦极/跳伞/直升机（有年龄限制）、长徒步（娃走不动）、品酒Tour（娃无聊）。住宿选Airbnb有厨房+洗衣机（娃的衣服一天换好几套）。租车选大一点的（安全座椅+推车+行李全要空间）。节奏：每天只安排1-2个活动，下午让娃在酒店/公园玩。新西兰人超级喜欢小孩，餐厅都会主动提供宝宝椅。', aiSummary: JSON.stringify({ locations: ['皇后镇', '箭镇', '基督城'], activities: ['亲子游', '蒸汽船', 'Skyline缆车', 'Kiwi Birdlife Park', 'Airbnb选房'], duration: '10天', budget: '$3000', season: '夏季', transport: '自驾', keyTips: ['蒸汽船宝宝免费', '每天1-2个活动', 'Airbnb有厨房洗衣机', '新西兰人很喜欢小孩'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/family-nz","https://loremflickr.com/300/400/kid-friendly-nz"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E4%BA%B2%E5%AD%90%E6%B8%B8', sourcePlatform: '小红书', likes: 5430, saves: 2600, comments: 345, status: 'auto_published', sourcePublishedAt: new Date('2025-01-28') },

    { routeId: r5.id, authorName: '打工度假过来的WHVer', authorAvatar: '', title: '新西兰打工度假一年：边打工边玩遍全国的路线总结', rawContent: '拿了NZ打工度假签（Working Holiday Visa）在NZ待了整一年。四季打工+旅行节奏：夏季12-3月-樱桃季在Cromwell打工（$23/hr+免费樱桃吃到饱），周末玩皇后镇周边。秋季4-5月-Tekapo/Mt Cook旺季结束人少+秋色最美，去箭镇看金秋。冬季6-8月-在南岛雪场打工（包住+免费滑雪），或者去北岛Rotorua泡温泉过冬。春季9-11月-在奥克兰打工攒钱，周末探索北岛。一年收入$30000左右，支出$25000（住宿$8000+吃喝$6000+交通$5000+活动$4000+其他$2000），还能攒$5000。WHV最大的福利不是赚钱，是可以慢节奏地深度体验每一个地方。', aiSummary: JSON.stringify({ locations: ['克伦威尔', '皇后镇', '蒂卡波湖', '罗托鲁瓦', '奥克兰'], activities: ['打工度假', '樱桃季打工', '雪场打工', '四季旅行', 'WHV预算'], duration: '1年', budget: '$25000/年', season: '全年', transport: '', keyTips: ['樱桃季$23/hr', '雪场打工包住+免费滑雪', '一年还能攒$5000', '慢节奏深度体验'] }), screenshots: JSON.stringify(["https://loremflickr.com/300/400/working-holiday-nz","https://loremflickr.com/300/400/cherry-picking-nz"]), sourceUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E6%96%B0%E8%A5%BF%E5%85%B0%E6%89%93%E5%B7%A5%E5%BA%A6%E5%81%87', sourcePlatform: '小红书', likes: 11200, saves: 5200, comments: 789, status: 'auto_published', sourcePublishedAt: new Date('2025-06-10') },
  ]

  for (const p of posts) {
    await prisma.post.create({ data: p })
  }

  console.log('Seed complete: 22 destinations, 11 routes, 17 variants, 75 posts')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
