import { getTopStoryIDs, getItem, getAllComments } from "../../lib/api";
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'

// Indentation for comments with different level
const levelIndent = {
    0: "",
    1: "indent-4",
    2: "indent-8",
    3: "indent-12",
    4: "indent-16",
    5: "indent-20",
    6: "indent-24",
    7: "indent-28",
    8: "indent-32",
}

export default function Story({ story, comments }) {
    return (
        <div>
            <h1 className="text-6xl font-bold">
                {story.title}
            </h1>

            {
                story.url && <Link href={story.url}>
                    <a className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">
                        {story.url}</a>
                </Link>
            }

            {
                story.text && <div className="border border-gray-200 text-gray-900"><br></br>
                    {story.text}</div>
            }

            <div className="mt-6 flex max-w-4xl flex-wrap text-start items-center justify-around sm:w-full">
                < ul className="bg-white rounded-lg border border-gray-200 text-gray-900" >
                    {
                        comments.map(comment => (
                            <li key={comment.id} className={`${levelIndent[comment.level]} py-2 border-b border-gray-200 w-full`} >
                                <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                            </li>
                        ))
                    }
                </ul >
            </div>
        </div >


    )
}


export async function getStaticPaths() {
    const ids = await getTopStoryIDs();

    return {
        paths: ids.map(id => ({ params: { id: id.toString() } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const story = await getItem(params.id);
    const comments = await getAllComments(0, story);

    return {
        props: {
            story,
            comments,
        },
        revalidate: 10,
    }
}