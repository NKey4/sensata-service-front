import React from "react";
import styles from "./Home.module.scss";
import { Info } from "./Info";

const cards = [
  {
    title: "О Компании",
    description:
      "Sensata Service — это современная и инновационная управляющая компания, являющаяся частью известной строительной корпорации Sensata Group. Мы открываем новую главу в сфере управления и обслуживания жилых комплексов, сочетая в себе последние технологические достижения, передовые методы управления и стремление к совершенству. Наша миссия — создание комфортной, безопасной и уютной среды для каждого жителя.",
  },
  {
    title: "Цели и Задачи",
    description:
      "Главная цель Sensata Service — это предоставление сервиса высшего класса в области управления жилыми комплексами. Наша задача — поддержание порядка, чистоты и безопасности в управляемых зданиях, а также оперативное решение любых вопросов и проблем, возникающих у жителей. Мы стремимся к созданию идеальных условий для жизни и отдыха, где каждый житель ощущает нашу заботу и внимание к его потребностям.",
  },
  {
    title: "Управление Домами",
    description:
      "На данный момент Sensata Service в г. Алматы осуществляет управление такими жилыми комплексами, как Sensata City 1, Sensata City 2, Sensata City 3 и Everest 1. В Астане обслуживаются жилые комплексы: Central Park, Sensata Park, S-Club, Aria, Gloria, Көк Жайлау, Miranda, Soul Park, Balausa, Центральный Сквер, Sunset Аvenue, Hayat, Sensata Plaza. Всего это составляет квартир и коммерческих помещений общей площадью около 600 000 м². В дополнение, в ближайшем будущем наш портфель значительно расширится за счёт новых объектов, которые в настоящее время находятся в процессе строительства компанией Sensata Group. Мы постоянно развиваемся и расширяемся, стремясь предоставить ещё более качественные услуги нашим клиентам.",
  },
];

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 style={{ marginBottom: "30px" }}>Sensata Service</h1>
        <img
          src="https://www.sensata.kz/img/comps/4791977a4a1b5ad375de0bd7baf32e47.jpeg"
          alt="Sensata Service"
          style={{ maxWidth: "100%" }}
        />
        <div className={styles.cards}>
          {cards.map((card, value) => (
            <Info
              key={value}
              title={card.title}
              description={card.description}
            ></Info>
          ))}
        </div>
      </div>
    </div>
  );
};
