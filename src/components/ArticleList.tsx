import { Article } from "../types/news";
import styled from "@emotion/styled";
import { ImageWithFallback } from "./common/imageWithFallback";
import fallbackImage from "../assets/fallback.png";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Author = styled.p`
  font-size: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  color: #28a745;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <>
    {articles?.length === 0 ? (
      <h2>No articles found. Please adjust your search criteria.</h2>
    ) : (
      ""
    )}

    <ListContainer>
      {articles?.map((article) => (
        <ArticleCard key={article.id}>
          <ImageWithFallback
            initialSrc={article.image}
            alt={article.title}
            fallbackSrc={fallbackImage}
          />
          <Title>{article?.title?.slice(0, 150)}...</Title>
          <Description>{article.description?.slice(0, 250)}...</Description>
          <Author>
            {article.author && `By ${article.author}`}
            {article.source?.name && ` • ${article.source.name}`}
            {article.publishedAt &&
              ` • ${new Date(article.publishedAt).toLocaleDateString()}`}
            {article.category && ` • ${article.category}`}
          </Author>
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </Link>
        </ArticleCard>
      ))}
    </ListContainer>
  </>
);
