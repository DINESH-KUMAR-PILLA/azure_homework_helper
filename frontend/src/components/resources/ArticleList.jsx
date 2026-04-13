import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }) {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="space-y-3">
      {articles.map((a, i) => <ArticleCard key={i} {...a} />)}
    </div>
  );
}
