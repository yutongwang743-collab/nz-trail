import { prisma } from './prisma'
import { type RouteWithVariants, type FilterState, type ItineraryDay } from './types'

// ── Destination highlight data ──

interface HighlightData {
  desc: string
  quote: { text: string; author: string }
  cover: string
}

const DEST_HIGHLIGHTS: Record<string, HighlightData> = {
  queenstown: {
    desc: '新西兰冒险之都，坐落在Wakatipu湖畔，被卓越山脉环绕。极限运动天堂与湖光山色的完美结合——蹦极发源地、Skyline山顶全景、Fergburger的排队盛况，每一秒都充满活力。',
    quote: { text: '从悉尼飞皇后镇只要3小时！那个湖真的太蓝了，Skyline山顶看全景绝了，感觉像在明信片里生活', author: '悉尼小饼干🍪' },
    cover: 'https://loremflickr.com/640/360/queenstown,lake-wakatipu,remarkables,mountains,view'
  },
  glenorchy: {
    desc: '魔戒取景地，天堂之路的起点。雪山倒影在Dart River上，栈桥延伸入湖面，红房子背后是连绵雪峰——每一帧都是壁纸级画面。',
    quote: { text: 'Glenorchy那条路真的太美了一路拍不停，Paradise Road名不虚传，建议早上早点去光线最柔', author: '悉尼小饼干🍪' },
    cover: 'https://loremflickr.com/640/360/glenorchy,new-zealand,lotr,paradise,road,jetty'
  },
  arrowtown: {
    desc: '淘金时代的历史小镇，秋天的白金汉街是南半球最美的街道。金黄落叶+彩色小屋+远山雪峰，搭配一杯Arrowtown Bakery的肉派，完美半日游。',
    quote: { text: 'Arrowtown超适合半天闲逛，秋天金黄落叶配彩色小屋简直像走进画里，白金汉街一定要从头走到尾', author: '悉大探险家🗺️' },
    cover: 'https://loremflickr.com/640/360/arrowtown,new-zealand,autumn-colors,gold-rush,cottages'
  },
  wanaka: {
    desc: '比皇后镇更安静、更文艺。孤独的树是南岛出片率最高的机位，Roys Peak的Instagram经典视角就在这里。湖光山色+精酿啤酒=完美度假节奏。',
    quote: { text: 'Wanaka湖边日落美到窒息，孤独的树前面拍照可能要排队但真的值，那个树+远山的构图太经典了', author: '墨尔本小圆子' },
    cover: 'https://loremflickr.com/640/360/wanaka,that-wanaka-tree,lake,new-zealand,mountains'
  },
  christchurch: {
    desc: '花园城市，南岛门户。雅芳河穿过百年Botanical Gardens，震后重生的纸板教堂和新Regent Street讲述着这座城市的韧性与优雅。',
    quote: { text: '基督城Jailhouse青旅很有意思真的是旧监狱改造的，花园城市名副其实，Botanical Gardens免费且超美', author: 'ANU留学狗🐶' },
    cover: 'https://loremflickr.com/640/360/christchurch,new-zealand,botanic-gardens,avon-river,city'
  },
  tekapo: {
    desc: '星空保护区内的奶蓝色湖泊，好牧人教堂+银河拱桥是南岛最经典的画面。夏季鲁冰花盛开时，紫色花海配雪峰背景，美得不真实。',
    quote: { text: '最震撼的是Tekapo的星空，肉眼可见银河，好牧人教堂前等到凌晨2点拍了人生照片，那个蓝色湖水也太不真实了', author: 'ANU留学狗🐶' },
    cover: 'https://loremflickr.com/640/360/lake-tekapo,church-of-good-shepherd,lupins,stars,new-zealand'
  },
  'mt-cook': {
    desc: '新西兰最高峰Aoraki的领地。Hooker Valley步道免费且不输任何收费景点——三座吊桥、冰川湖、雪山倒影，3小时往返的史诗级徒步体验。',
    quote: { text: '站在Tasman冰川上那种蓝真的太纯净了！Hooker Valley Track免费的但风景不输任何收费景点，第二座吊桥是最佳机位', author: '布村阿May' },
    cover: 'https://loremflickr.com/640/360/aoraki,mount-cook,hooker-valley,glacier,new-zealand'
  },
  'milford-sound': {
    desc: '世界第八大奇迹。雨天瀑布从每一面悬崖倾泻而下更壮观，Mitre Peak直插云霄，海豚偶尔跃出水面——这里的一切都在提醒你大自然的鬼斧神工。',
    quote: { text: '我们运气好赶上了大雨天，结果瀑布从每一面悬崖上倾泻下来，那个场景真的太震撼了！船头最前面视角最好', author: '胶片旅行者📷' },
    cover: 'https://loremflickr.com/640/360/milford-sound,mitre-peak,waterfall,fiordland,new-zealand'
  },
  auckland: {
    desc: '千帆之都，新西兰最大城市。天空塔俯瞰Waitemata和Manukau两座海港，Ponsonby的文艺咖啡馆和Viaduct Harbour的游艇餐厅是都市生活的精华。',
    quote: { text: '奥克兰Viaduct Harbour傍晚好美，Ponsonby Central的brunch可以坐一下午，Devonport坐渡轮过去也很惬意', author: 'Monash小幸运' },
    cover: 'https://loremflickr.com/640/360/auckland,sky-tower,viaduct-harbour,city,new-zealand'
  },
  hobbiton: {
    desc: '指环王夏尔村取景地。44个霍比特洞散落在碧绿丘陵间，每个门前都有精心打理的花园。在Green Dragon Inn喝一杯Southfarthing啤酒，影迷此生必去。',
    quote: { text: '霍比屯真的不是照骗！那个绿意配彩色小门比电影里还梦幻，Green Dragon Inn还能喝一杯，导游讲的故事也很有趣', author: 'Monash小幸运' },
    cover: 'https://loremflickr.com/640/360/hobbiton,movie-set,shire,green,hills,new-zealand'
  },
  rotorua: {
    desc: '地热奇观与毛利文化的双重震撼。Wai-O-Tapu的香槟池色彩斑斓，Te Puia的间歇泉定时喷发，Polynesian Spa泡着温泉看湖景——硫磺味是这座城市的独特记忆。',
    quote: { text: 'Rotorua的地热公园硫磺味很重但真的很震撼，Wai-O-Tapu那个香槟池颜色太魔幻了，Polynesian Spa晚上泡温泉看湖景绝了', author: 'Monash小幸运' },
    cover: 'https://loremflickr.com/640/360/rotorua,wai-o-tapu,geothermal,colorful,pools,new-zealand'
  },
  tongariro: {
    desc: '末日火山，世界十大单日徒步之一。19.4公里的穿越经过翡翠湖、蓝湖和火山口，地貌像在另一个星球。走完后的成就感无可替代。',
    quote: { text: 'Tongariro Alpine Crossing走了8个小时腿已废但值！翡翠湖那个绿色真的太惊艳了，全程地貌像在火星徒步', author: 'Monash小幸运' },
    cover: 'https://loremflickr.com/640/360/tongariro,alpine-crossing,emerald-lakes,volcano,new-zealand'
  },
  'te-anau': {
    desc: '峡湾国家公园的门户小镇，比皇后镇安静一百倍。南岛最大湖泊的日落+萤火虫洞的蓝色星光+Kepler Track的原始森林——被严重低估的宝藏。',
    quote: { text: 'Te Anau才是隐藏宝藏！比皇后镇安静一百倍，湖边日落美到窒息，萤火虫洞里像在看另一片星空', author: '背包客小李🎒' },
    cover: 'https://loremflickr.com/640/360/te-anau,lake,fiordland,peaceful,new-zealand'
  },
  'franz-josef': {
    desc: '西海岸最易到达的冰川。直升机直接降落冰面，蓝冰洞和冰裂缝的纯净蓝色令人窒息。冰川谷步道免费也能看到冰川全景，搭配冰川温泉是冰火两重天的治愈。',
    quote: { text: '直升机冰川徒步$450是全程最贵的活动但也最值！站蓝冰上的感觉无法形容，向导还会带钻冰洞', author: '极光猎人手札' },
    cover: 'https://loremflickr.com/640/360/franz-josef-glacier,helicopter,ice,new-zealand,west-coast'
  },
  'fox-glacier': {
    desc: '比Franz Josef更野生、更安静。Lake Matheson镜面倒影Aoraki是新西兰明信片角度，清晨无风时双峰倒影完美对称，步行20分钟就能抵达。',
    quote: { text: 'Lake Matheson清晨倒影太绝了，Aoraki双峰完美对称在湖面上，建议日出前去走一圈不到一小时', author: '极光猎人手札' },
    cover: 'https://loremflickr.com/640/360/fox-glacier,lake-matheson,reflection,new-zealand'
  },
  hokitika: {
    desc: '西海岸艺术小镇+自然奇观。Hokitika Gorge奶蓝色峡谷完全不输Tekapo，且游客更少。镇上的绿石工坊和日落海滩篝火是西海岸独有的松弛感。',
    quote: { text: 'Hokitika Gorge那个奶蓝色真的太出片了，完全不输Tekapo！而且没什么人，步行道很短就能走到最佳拍照点', author: '极光猎人手札' },
    cover: 'https://loremflickr.com/640/360/hokitika-gorge,blue-water,new-zealand,west-coast'
  },
  kaikoura: {
    desc: '雪山遇见海洋的奇观之地。观鲸成功率70%以上，抹香鲸全年可见。Nin\'s Bin龙虾餐车被赞为"全程最佳一餐"，Peninsula Walkway的海豹群自由散漫。',
    quote: { text: 'Kaikoura真的太绝了！早上观鲸团看到了三只抹香鲸，Nin\'s Bin龙虾新鲜到甜，一只大龙虾$50值爆了', author: '观鲸成功のLuna' },
    cover: 'https://loremflickr.com/640/360/kaikoura,whale,seal,mountains,ocean,new-zealand'
  },
  blenheim: {
    desc: 'Marlborough葡萄酒产区中心，Sauvignon Blanc的故乡。租一辆自行车穿行在葡萄园间，品酒+生蚝+阳光的组合是南岛最惬意的一天。',
    quote: { text: 'Marlborough租自行车逛酒庄最地道！Wither Hills的Sauvignon Blanc配生蚝绝了，酒庄午餐view一流', author: '观鲸成功のLuna' },
    cover: 'https://loremflickr.com/640/360/marlborough,vineyard,wine,bike,new-zealand'
  },
  paihia: {
    desc: '岛屿湾的门户天堂。144个岛屿散落在碧蓝海水里，游船穿过巨型岩洞时全船尖叫。海豚群跟着船游的场面让人感动——北岛不止霍比屯。',
    quote: { text: '144个岛屿散落在碧蓝海水里，游船穿洞的时候全船人都在尖叫！海豚超级多跟着船游了好久', author: '北岛流浪记' },
    cover: 'https://loremflickr.com/640/360/paihia,bay-of-islands,cruise,dolphins,new-zealand'
  },
  'cape-reinga': {
    desc: '新西兰最北端的灯塔，站在这里亲眼看到塔斯曼海和太平洋的洋流交汇线。九十英里海滩的沙丘滑沙+最北打卡，是北岛最值得的远行。',
    quote: { text: 'Cape Reinga的灯塔站在新西兰最北端看塔斯曼海和太平洋交汇，那个分界线真的能看到，太震撼了', author: '北岛流浪记' },
    cover: 'https://loremflickr.com/640/360/cape-reinga,lighthouse,ocean,meeting-seas,new-zealand'
  },
  cromwell: {
    desc: '中奥塔哥樱桃之都+Pinot Noir核心产区。夏季入园樱桃随便吃，旁边的Bannockburn酒庄区是新西兰海拔最高的葡萄园，秋天葡萄园一片金黄绝美。',
    quote: { text: '12月去新西兰一定要去Cromwell摘樱桃！入园费$10随便吃，那个樱桃大得像李子甜到怀疑人生', author: '樱桃猎人🍒' },
    cover: 'https://loremflickr.com/640/360/cromwell,cherry,orchard,central-otago,new-zealand'
  },
  bluff: {
    desc: '南岛最南端，Stirling Point标志牌是必打卡地标。布拉夫生蚝$25/打，被公认为全纽最鲜甜。站在这里你离南极洲只差一片南大洋。',
    quote: { text: 'Bluff生蚝$25一打是全纽最鲜甜的！Stirling Point牌子打卡南岛最南端，感觉自己站在世界的尽头', author: '樱桃猎人🍒' },
    cover: 'https://loremflickr.com/640/360/bluff,oysters,stirling-point,southern-most,new-zealand'
  },
}

function resolveHighlightSlug(locationName: string): string {
  return locationName.toLowerCase().replace(/[^a-z]/g, '')
}

function enrichItinerary(itinerary: ItineraryDay[]): ItineraryDay[] {
  return itinerary.map(day => {
    const mainSlug = resolveHighlightSlug(day.locations[0] || '')
    const hl = DEST_HIGHLIGHTS[mainSlug]
    if (!hl) return day
    return {
      ...day,
      highlightDesc: hl.desc,
      highlightQuote: hl.quote,
      coverImage: hl.cover,
    }
  })
}

export async function getRoutes(filters?: FilterState): Promise<RouteWithVariants[]> {
  const conditions: any[] = []

  if (filters?.typeTags.length) {
    filters.typeTags.forEach(tag => conditions.push({ typeTags: { contains: tag } }))
  }
  if (filters?.seasons.length) {
    filters.seasons.forEach(season => conditions.push({ bestSeason: { contains: season } }))
  }
  if (filters?.durations.length) {
    conditions.push({ variants: { some: { duration: { in: filters.durations } } } })
  }

  const routes = await prisma.route.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    include: {
      destinations: { include: { destination: true }, orderBy: { dayIndex: 'asc' } },
      variants: true,
    },
    orderBy: [{ featuredOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return routes.map(r => ({
    ...r,
    bestSeason: JSON.parse(r.bestSeason),
    typeTags: JSON.parse(r.typeTags),
    variants: r.variants.map(v => ({ ...v, itinerary: enrichItinerary(JSON.parse(v.itinerary)) })),
  })) as RouteWithVariants[]
}

export async function getRouteBySlug(slug: string) {
  const r = await prisma.route.findUnique({
    where: { slug },
    include: {
      destinations: { include: { destination: true }, orderBy: { dayIndex: 'asc' } },
      variants: true,
      posts: {
        where: { status: 'auto_published' },
        orderBy: { likes: 'desc' },
        take: 10,
      },
    },
  })
  if (!r) return null

  return {
    ...r,
    bestSeason: JSON.parse(r.bestSeason),
    typeTags: JSON.parse(r.typeTags),
    variants: r.variants.map(v => ({ ...v, itinerary: enrichItinerary(JSON.parse(v.itinerary)) })),
    posts: r.posts.map(p => ({ ...p, aiSummary: JSON.parse(p.aiSummary) })),
  }
}

export async function getRecentPosts(limit = 6) {
  const posts = await prisma.post.findMany({
    where: { status: 'auto_published' },
    orderBy: { likes: 'desc' },
    take: limit,
    include: { route: { select: { title: true, slug: true } } },
  })
  return posts.map(p => ({
    ...p,
    aiSummary: JSON.parse(p.aiSummary),
    screenshots: JSON.parse(p.screenshots),
  }))
}

export async function getPostById(id: number) {
  const p = await prisma.post.findUnique({
    where: { id },
    include: { route: { select: { title: true, slug: true } } },
  })
  if (!p) return null
  return {
    ...p,
    aiSummary: JSON.parse(p.aiSummary),
    screenshots: JSON.parse(p.screenshots),
  }
}

export async function getDestinationBySlug(slug: string) {
  const dest = await prisma.destination.findUnique({
    where: { slug },
    include: {
      routeDestinations: {
        include: {
          route: {
            include: {
              variants: true,
              destinations: {
                include: { destination: true },
                orderBy: { dayIndex: 'asc' },
              },
            },
          },
        },
        orderBy: { dayIndex: 'asc' },
      },
    },
  })

  if (!dest) return null

  // Find posts mentioning this destination
  const relatedPosts = await prisma.post.findMany({
    where: { status: 'auto_published' },
    orderBy: { likes: 'desc' },
    take: 10,
  })

  const filteredPosts = relatedPosts.filter(p => {
    const summary = JSON.parse(p.aiSummary)
    return summary.locations?.some((loc: string) =>
      loc.includes(dest.name) || dest.name.includes(loc)
    )
  }).map(p => ({
    ...p,
    aiSummary: JSON.parse(p.aiSummary),
    screenshots: JSON.parse(p.screenshots),
  }))

  const result = {
    ...dest,
    practicalInfo: JSON.parse(dest.practicalInfo),
    routes: dest.routeDestinations.map(rd => ({
      ...rd.route,
      bestSeason: JSON.parse(rd.route.bestSeason),
      typeTags: JSON.parse(rd.route.typeTags),
      variants: rd.route.variants.map(v => ({
        ...v,
        itinerary: enrichItinerary(JSON.parse(v.itinerary)),
      })),
      dayIndex: rd.dayIndex,
    })),
    posts: filteredPosts.slice(0, 6),
  }

  return result
}
