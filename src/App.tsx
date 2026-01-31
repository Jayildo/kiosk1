import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import Footer from './components/layout/Footer';
import CategoryNav from './components/category/CategoryNav';
import CategorySection from './components/category/CategorySection';
import ScrollToTop from './components/ui/ScrollToTop';
import ReloadPrompt from './components/ui/ReloadPrompt';
import { categories, apps } from './data/apps';
import { useInstalledApps } from './hooks/useInstalledApps';

export default function App() {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
  const { isInstalled, toggleInstalled } = useInstalledApps();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-0 pb-8">
        <CategoryNav categories={sortedCategories} />

        <div className="flex flex-col gap-10 mt-8">
          {sortedCategories.map((category) => {
            const categoryApps = apps.filter(
              (app) => app.categoryId === category.id
            );
            return (
              <CategorySection
                key={category.id}
                category={category}
                apps={categoryApps}
                isInstalled={isInstalled}
                toggleInstalled={toggleInstalled}
              />
            );
          })}
        </div>
      </div>

      <Footer />
      <ScrollToTop />
      <ReloadPrompt />
    </div>
  );
}
