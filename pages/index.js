import Link from 'next/link'
import { getTopStories } from '../lib/api';

function HomePage({ stories }) {
  return (
    <div>
      <h1 className="text-6xl font-bold">

        <a className="text-blue-600" href="https://news.ycombinator.com/news">
          Hacker News Top Stories Demo
        </a>
      </h1>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <ul className="bg-white rounded-lg border border-gray-200 text-gray-900">
          {stories.map(story => (
            <li key={story.id} className="px-6 py-2 border-b border-gray-200 w-full">
              <Link href={`/stories/${story.id}`}>
                <a>{story.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const stories = await getTopStories();

  return {
    props: {
      stories,
    },
    revalidate: 10,
  };
}


export default HomePage

