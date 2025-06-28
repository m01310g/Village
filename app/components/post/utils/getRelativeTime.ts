export const getRelativeTime = (dateStr: string): string => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 2419200) return `${Math.floor(diff / 604800)}주 전`;

  return `${target.getFullYear()}.${target.getMonth() + 1}.${target.getDate()}`;
};
