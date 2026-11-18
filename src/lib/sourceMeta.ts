// 帖子来源平台 → 图标 + 标签，用于「真实性来源」展示

export const SOURCE_META: Record<string, { icon: string; label: string }> = {
  '小红书': { icon: '📕', label: '小红书' },
  '抖音': { icon: '🎵', label: '抖音' },
  'Instagram': { icon: '📸', label: 'Instagram' },
  '穷游网': { icon: '🧳', label: '穷游网' },
  'Wikivoyage': { icon: '🌐', label: 'Wikivoyage' },
  '猫途鹰': { icon: '🦉', label: '猫途鹰' },
  '马蜂窝': { icon: '🐝', label: '马蜂窝' },
  '用户投稿': { icon: '💬', label: '用户投稿' },
}

export function sourceMeta(platform: string): { icon: string; label: string } {
  return SOURCE_META[platform] || { icon: '📄', label: platform || '来源' }
}
