// src/pages/About.tsx
import Container from "../components/Container";
import styles from "./About.module.css";

export default function About() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>O naší rodině</h1>

        <div className={styles.content}>
          <p>
            Vítejte v rodinné kronice! Tento projekt uchovává vzpomínky na naše
            společné výlety, dobrodružství a malé radosti, které spolu sdílíme.
          </p>

          <p>
            Každý přidaný výlet je malou vzpomínkou, která tvoří naši společnou
            historii. Naším cílem je mít jedno místo, kde si všechno hezky
            připomeneme – a kde budou tyhle chvíle žít dál.
          </p>
        </div>

        <div className={styles.highlight}>
          Díky, že jsi součástí našeho příběhu.
        </div>
      </div>
    </Container>
  );
}
