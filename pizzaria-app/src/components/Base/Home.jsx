import React from "react";

const Home = () => {
  return (
    <div>
      <h3 className="text-center">Our Story</h3>
      <p className="text-left">
        We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on
        our Facebook fan page. Fans were given situations where they had to come
        up with wacky and fun excuses. The person with the best excuse won the
        Best Excuse Badge and won Pizzeria’s vouchers. Their enthusiastic
        response proved that Pizzeria’s Fresh Pan Pizza is the Tastiest Pan
        Pizza. Ever!
      </p>
      <p>
        Ever since we launched the Tastiest Pan Pizza, ever, people have not
        been able to resist the softest, cheesiest, crunchiest, butteriest
        Domino’s Fresh Pan Pizza. They have been leaving the stage in the middle
        of a performance and even finding excuses to be disqualified in a
        football match.
      </p>
      <p>
        We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page.
        Fans were given situations where they had to come up with wacky and fun
        excuses. The person with the best excuse won the Best Excuse Badge and
        won Domino’s vouchers. Their enthusiastic response proved that
        Pizzeria’s Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
      </p>
      <section className="ingredients py-5 d-flex justify-content-evenly align-items-center">
        <div className="left-section w-50">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1065271505/display_1500/stock-photo-raw-dough-pizza-and-ingredient-1065271505.jpg"
            alt="Ingredients image"
            style={{ width: "400px", borderRadius: "10px" }}
          />
        </div>
        <div className="right-section w-75">
          <h3>Ingredients</h3>
          <p>
            We’re ruthless about goodness. We have no qualms about tearing up a
            day-old lettuce leaf (straight from the farm), or steaming a baby
            (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir. Stir. While
            they’re still young and fresh – that’s our motto. It makes the
            kitchen a better place.
          </p>
        </div>
      </section>
      <section className="chefs py-5 d-flex justify-content-evenly align-items-center">
        <div className="left-section w-75">
          <h3>Our Chefs</h3>
          <p>
            They make sauces sing and salads dance. They create magic with
            skill, knowledge, passion, and stirring spoons (among other things).
            They make goodness so good, it doesn’t know what to do with itself.
            We do though. We send it to you.
          </p>
        </div>
        <div className="right-section w-50">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/437116033/display_1500/stock-photo-happy-chef-437116033.jpg"
            alt="Chef Image"
            style={{ width: "400px", borderRadius: "10px" }}
          />
        </div>
      </section>
      <section className="delivery py-5 d-flex justify-content-center align-items-center">
        <div className="left-section w-75">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2609105335/display_1500/stock-photo-a-phone-with-a-black-and-white-minute-timer-to-study-with-pomodoro-method-on-laptop-keyboard-2609105335.jpg"
            alt="Delivery image"
            style={{ width: "400px", borderRadius: "10px" }}
          />
        </div>
        <div className="right-section w-75">
          <h3>45 min delivery</h3>
        </div>
      </section>
    </div>
  );
};

export default Home;
