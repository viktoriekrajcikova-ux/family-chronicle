import Container from "../components/Container";

export default function About() {
  return (
    <Container className="py-10">
      <div className="max-w-prose mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          O naší rodině
        </h1>

        <div className="prose prose-indigo text-gray-700 leading-relaxed">
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

        <div className="mt-8 p-5 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm">
          <p className="text-indigo-700 font-medium text-lg">
            Díky, že jsi součástí našeho příběhu.
          </p>
        </div>
      </div>
    </Container>
  );
}
