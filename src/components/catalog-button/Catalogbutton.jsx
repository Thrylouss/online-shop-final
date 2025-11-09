import { useState, useRef, useEffect } from "react";
import "../../styles/scss/components/catalogButton.scss";
import {
  X,
  ChevronRight,
  Star,
  Shirt,
  Palette,
  Smartphone,
  Tent,
  Headphones,
  Monitor,
  ShoppingBag,
  Footprints,
  ShoppingBasket,
  Sparkles,
  Heart,
  Menu,
} from "lucide-react";

const categories = [
  {
    id: "weekly",
    name: "Товары недели",
    icon: <Star className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "winter",
    name: "Зимняя коллекция",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "hobby",
    name: "Хобби и творчество",
    icon: <Palette className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "smartphones",
    name: "Смартфоны",
    icon: <Smartphone className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "tourism",
    name: "Туризм, рыбалка и охота",
    icon: <Tent className="w-5 h-5" />,
    subcategories: [
      {
        name: "Палатки, тенты и шатры",
        items: ["Палатки", "Тенты и шатры", "Аксессуары для палаток и тентов"],
      },
      {
        name: "Охота и стрельба",
        items: [
          "Рогатки",
          "Оптика и прицелы",
          "Спортивная стрельба",
          "Оформления трофеев",
        ],
      },
      {
        name: "Рыбалка",
        items: [
          "Катушки для рыбалки",
          "Снасти и аксессуары для рыбалки",
          "Приманки и наживки рыболовные",
          "Лодки и аксессуары",
        ],
      },
      {
        name: "Туризм и отдых на природе",
        items: [
          "Фонари и аксессуары",
          "Аксессуары для туризма и отдых",
          "Туристические рюкзаки и сумки",
          "Складные стулья туристические",
        ],
      },
    ],
  },
  {
    id: "electronics",
    name: "Электроника",
    icon: <Headphones className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "appliances",
    name: "Бытовая техника",
    icon: <Monitor className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "clothing",
    name: "Одежда",
    icon: <ShoppingBag className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "shoes",
    name: "Обувь",
    icon: <Footprints className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "accessories",
    name: "Аксессуары",
    icon: <ShoppingBasket className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "beauty",
    name: "Красота и уход",
    icon: <Sparkles className="w-5 h-5" />,
    subcategories: [],
  },
  {
    id: "health",
    name: "Здоровье",
    icon: <Heart className="w-5 h-5" />,
    subcategories: [],
  },
];

export default function CatalogMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tourism");

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="catalog-menu" ref={menuRef}>
        <button
      className={`catalog-btn ${isOpen ? "open" : ""}`}
      onClick={toggleMenu}
    >
      <span className="catalog-btn__icon">
        {isOpen ? <X /> : <Menu />}
      </span>
      <span className="catalog-btn__text">Каталог</span>
    </button>

      {isOpen && (
        <div className="catalog-menu__dropdown">
          <div className="catalog-menu__dropdown__container">
            <div className="catalog-menu__dropdown__sidebar">
              <div className="catalog-menu__dropdown__sidebar__content">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    onMouseEnter={() => setSelectedCategory(category.id)}
                    className={`catalog-menu__category ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                  >
                    <span className="catalog-menu__category__icon">
                      {category.icon}
                    </span>
                    <span className="catalog-menu__category__name">
                      {category.name}
                    </span>
                    <ChevronRight className="catalog-menu__category__chevron" />
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-menu__dropdown__content">
              {selectedCategoryData &&
              selectedCategoryData.subcategories.length > 0 ? (
                <div className="catalog-menu__panel">
                  <div className="catalog-menu__panel__header">
                    <h3>{selectedCategoryData.name}</h3>
                    <ChevronRight className="chevron-icon" />
                  </div>
                  <div className="catalog-menu__panel__grid">
                    {selectedCategoryData.subcategories.map((subcat, index) => (
                      <div key={index} className="catalog-menu__panel__column">
                        <h4>{subcat.name}</h4>
                        <ul>
                          {subcat.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a href="#">{item}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {selectedCategoryData.id === "tourism" && (
                    <button className="catalog-menu__panel__more-btn">
                      Ещё 9
                      <ChevronRight className="chevron-icon" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="catalog-menu__panel__empty">
                  <p>Подкategoriyalar tez orada qo'shiladi</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
