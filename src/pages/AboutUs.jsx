import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-header">
        <img
          src="/public/AboutUs.jpg"
          alt="About Us"
          className="about-us-image"
        />
        <h1>Acerca de Lale</h1>
      </div>
      <div className="about-us-content">
        <section className="about-us-section">
          <h2>Hola! ❤️</h2>
          <p>
            Hola! soy Arleth. Puede que me conozcas como salgo en todas mis
            redes como Lale Correa, trabajo con cirugías estéticas y me he
            sometido a algunas recientemente, trabaje mucho en encontrar la faja
            perfecta , cuando la encontre, dije por que no compartirla con
            ustedes!! y aqui esta de mi para ti!. Escribeme como puedo ayudarte!
          </p>
        </section>
        <section className="about-us-section">
          <h2>Mision</h2>
          <p>
            Mi misión en <strong>LaleFajas</strong> es empoderarte en tu camino
            hacia el bienestar y la confianza personal. Inspirada por mi propia
            experiencia, me he dedicado a compartir soluciones y herramientas
            que te ayudarán a reflejar tu belleza interior en el exterior.{" "}
            <br /> <br />
            Quiero que sepas que alcanzar tus sueños es posible y estoy aquí
            para guiarte. Únete a esta comunidad de apoyo que he creado pensando
            en ti. Soy Lale Correa, y te invito con todo mi cariño a descubrir
            todo lo que he preparado para ti.
          </p>
        </section>
        <section className="about-us-section">
          <h2>Nuestros valores</h2>
          <ul>
            <li>
              <strong>Enfoque en el Cliente:</strong> Ponemos a nuestros
              clientes en el centro de todo lo que hacemos.
            </li>
            <li>
              <strong>Calidad:</strong> Estamos comprometidos a proporcionar
              productos de primera calidad que superen las expectativas.
            </li>
            <li>
              <strong>Integridad:</strong> Conducimos nuestro negocio con los
              más altos estándares de ética y transparencia.
            </li>
            <li>
              <strong>Innovación:</strong> Aceptamos el cambio y siempre estamos
              buscando formas de mejorar.
            </li>
            <li>
              <strong>Comunidad:</strong> Creemos en retribuir y apoyar a las
              comunidades a las que servimos.
            </li>
          </ul>
        </section>

        <section className="about-us-section">
          <h2>Politicas</h2>
          <p>
            En <strong>LaleFajas</strong>, valoramos la higiene y la seguridad
            de nuestros clientes por encima de todo. Dado el carácter íntimo de
            nuestras prendas, hemos adoptado una política estricta de no
            retorno. Esta medida garantiza que cada producto que adquieras sea
            completamente nuevo y no haya sido usado por otra persona,
            manteniendo así los más altos estándares de calidad e higiene.
            <br />
            <br />
            Entendemos que comprar la prenda adecuada es importante para ti, por
            lo que nos comprometemos a ofrecerte toda la información y
            asesoramiento necesario antes de tu compra para asegurar tu
            satisfacción. Agradecemos tu comprensión y confianza al elegir
            LaleFajas para tus necesidades de bienestar y belleza personal.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
