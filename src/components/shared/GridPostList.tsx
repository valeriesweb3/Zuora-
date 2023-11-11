import { Link } from "react-router-dom";



// eslint-disable-next-line no-empty-pattern
const GridPostList = ({
  
  
}: GridPostListProps) => {
  

  return (
    <ul className="grid-container">
      
        <li key={0} className="relative min-w-80 h-80">
          <Link to={`/posts/${0}`} className="grid-post_link">
            <img
              src={"/assets/icons/profile-placeholder.svg"}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">Yepyep</p>
              </div>
            
            
          </div>
        </li>
      
    </ul>
  );
};

export default GridPostList;
