import { HeroSlideshow } from "../components/HeroSlideshow";
import { ProductCategories } from "../components/ProductCategories";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { FeaturedProjects } from "../components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <WhyChooseUs />
      <ProductCategories />
      <FeaturedProjects />
    </>
  );
}
