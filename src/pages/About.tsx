// src/pages/About.tsx

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">O naší rodině</h1>

      <p className="text-gray-700 leading-relaxed text-lg">
        Vítejte v rodinné kronice!  
        Tento projekt uchovává vzpomínky na naše společné výlety, dobrodružství
        a malé radosti, které spolu sdílíme.  
      </p>

      <p className="mt-4 text-gray-700 leading-relaxed">
        Každý přidaný výlet je malou vzpomínkou, která tvoří naši společnou
        historii. Naším cílem je mít jedno místo, kde si všechno hezky
        připomeneme – a kde budou tyhle chvíle žít dál.
      </p>

      <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <p className="text-indigo-700 font-medium">
          Díky, že jsi součástí našeho příběhu.
        </p>
      </div>
    </div>
  );
}
