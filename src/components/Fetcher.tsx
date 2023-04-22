import React from 'react'
import { useLazyGetSummaryQuery } from "../store/article";

function Fetcher() {
    const [article, setArticle] = React.useState({
      url: "",
      summary: "",
    });
    const [allArticles, setAllArticles] = React.useState([
        {
            url: "https://www.theverge.com/2021/9/9/22661105/tesla-elon-musk-ai-robotaxi-robotic-cars",
            summary: "",
        }
    ]);
    const [copied, setCopied] = React.useState("");
    const [getSummary, {isFetching, isLoading, error }] = useLazyGetSummaryQuery();
  
    React.useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
        localStorage.getItem("articles") as string
    );
      
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }

    }, []);

    const handleSubmit = async (
        e: any
    ) => {
        e.preventDefault();
        type item = {
            url: string;
            summary: string;
        }
        const existingArticle = allArticles.find(
          (item : item) => {
            return item?.url === article.url;
          }
        );
    
        if (existingArticle) return setArticle(existingArticle);
    
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
          const newArticle = { ...article, summary: data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];
    
          // update state and local storage
          setArticle(newArticle);
          setAllArticles(
            updatedAllArticles
          );
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
      };
    // copy the url and toggle the icon for user feedback
    const handleCopy = (
        copyUrl: string,
    ) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(
            false as unknown as string
        ), 3000);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.keyCode === 13) {
        handleSubmit(e);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    return (
        <section className='mt-16 w-full max-w-xl'>
        {/* Search */}
        <div className='flex flex-col w-full gap-2'>
          <form
            className='relative flex justify-center items-center'
            onSubmit={handleSubmit}
          >
  
            <input
              type='url'
              placeholder='Paste the article link'
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
            />
            <button
              type='submit'
              className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
            >
              <p>↵</p>
            </button>
          </form>
  
          {/* Browse History */}
          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {allArticles.reverse().map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className='link_card'
              >
                <div className='copy_btn' onClick={() => handleCopy(
                    item.url
                )}>
                  <img
                    src={copied === item.url ? 'tick' : 'copy'}
                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                    className='w-[40%] h-[40%] object-contain'
                  />
                </div>
                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                  {
                    item.url
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Display Result */}
        <div className='my-10 max-w-full flex justify-center items-center'>
          {isFetching ? (
            <img src={'loader'} alt='loader' className='w-20 h-20 object-contain' />
          ) : error ? (
            <p className='font-inter font-bold text-black text-center'>
              Well, that wasn't supposed to happen...
              <br />
              <span className='font-satoshi font-normal text-gray-700'>
                'errpr'
              </span>
            </p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                  Article <span className='blue_gradient'>Summary</span>
                </h2>
                <div className='summary_box'>
                  <p className='font-inter font-medium text-sm text-gray-700'>
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
  )
}

export default Fetcher