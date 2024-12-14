import Container from "../Shared/Container";
import CategoryBox from "./CategoryBox";
import { IoBusinessOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { CiMedicalCase } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";

const categories = [
  {
    label: "Business",
    icon: IoBusinessOutline,
  },
  {
    label: "Gaming",
    icon: IoGameControllerOutline,
  },
  {
    label: "Medical",
    icon: CiMedicalCase,
  },
  {
    label: "Writing",
    icon: TfiWrite,
  },
];

const Categories = () => {
  return (
    <Container>
      <div className="flex items-center justify-center gap-x-8 mt-2 mb-8 mx-auto overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
