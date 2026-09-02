import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { newsItems } from "@/data/news";
import { ShareButton } from "@/components/ui/ShareButton";

export interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const news = newsItems.find(n => n.id === resolvedParams.id);
  if (!news) {
    return { title: "News Not Found" };
  }
  return {
    title: `${news.title} | KM Media News`,
    description: news.excerpt,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const news = newsItems.find(n => n.id === resolvedParams.id);

  if (!news) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 md:px-10">
          
          <div className="flex items-center justify-between mb-8">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-brand-text-secondary dark:text-neutral-400 hover:text-brand-primary transition-colors group">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to News
            </Link>
            
            <ShareButton title={news.title} />
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-bold rounded-full">
                {news.category}
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                <Calendar size={16} />
                {news.date}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-text-primary dark:text-white leading-tight">
              {news.title}
            </h1>
          </div>

          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-brand-primary/10">
            <Image 
              src={news.image} 
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-brand-text-secondary dark:text-neutral-300 text-lg leading-relaxed space-y-6 [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-brand-text-primary [&>h3]:dark:text-white [&>h3]:mt-10 [&>h3]:mb-4">
             <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

        </article>
      </div>

      <Footer />
    </main>
  );
}
