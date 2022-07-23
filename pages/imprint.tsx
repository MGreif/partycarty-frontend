import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Imprint = () => {
  return (
    <div style={{ padding: '2em' }}>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>
        Mika Greif
        <br />
        IT-Dienstleistung, IT-Beratung, Software-Design, Software-Entwicklung
        und IT-Sicherheit
        <br />
        Am Pfingstberg 1<br />
        13467 Berlin
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 017630188475
        <br />
        E-Mail: mika.greif@googlemail.com
      </p>

      <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p>
        Berufsbezeichnung:
        <br />
        Software-Entwickler
      </p>
      <p>
        Verliehen in:
        <br />
        Deutschland
      </p>
      <p>Es gelten folgende berufsrechtliche Regelungen:</p>
      <h2>
        Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
      </h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
      <h2>Datenschutz</h2>
      <p>
        Die Nutzung unserer Webseite ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (beispielsweise Name, Anschrift oder
        eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
        freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
        Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass
        die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
        Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor
        dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen
        der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
        Übersendung von nicht ausdrücklich angeforderter Werbung und
        Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die
        Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
        Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
        Spam-Mails, vor.
      </p>
    </div>
  )
}

export default Imprint

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'newPage'])),
    },
  }
}
