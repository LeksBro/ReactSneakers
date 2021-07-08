import ContentLoader from "react-content-loader";
import React from "react";
import styles from "./Card.module.scss";

const CardLoader = () => {
    return  <div className={styles.card}>
    <ContentLoader
        speed={2}
        width={160}
        height={652}
        viewBox="0 0 160 652"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

    >

        <rect x="0" y="0" rx="10" ry="10" width="150" height="150"/>
        <rect x="79" y="46" rx="0" ry="0" width="1" height="0"/>
        <rect x="0" y="170" rx="10" ry="10" width="150" height="15"/>
        <rect x="0" y="192" rx="10" ry="10" width="100" height="15"/>
        <rect x="120" y="228" rx="10" ry="10" width="32" height="32"/>
        <rect x="0" y="2311" rx="10" ry="10" width="100" height="24"/>
        <rect x="0" y="232" rx="10" ry="10" width="100" height="24"/>
    </ContentLoader>
        </div>
}
export default CardLoader
