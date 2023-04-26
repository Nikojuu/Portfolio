const cardsContainer = document.querySelector(".cards-container");
const cards = document.querySelectorAll(".card__skills");
const skills = document.querySelectorAll(".card__skills__skill");
const projectsImg = document.querySelectorAll(".projects__image");
const verticalLineLeft = document.querySelector(".vertical__line-left");
const verticalLineRight = document.querySelector(".vertical__line-right");
const horizontalLineLeft = document.querySelector(".horizontal__line-left");
const horizontalLineRight = document.querySelector(".horizontal__line-right");
const projectsDescription = document.querySelectorAll(".projects__description");
// helper waitTime function just pass Millseconds you want to wait!
const waitTime = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
///// Skill section observers observs cards and pass functions into it///
const observerSkills = new IntersectionObserver(
  async (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      return;
    } else if (entry.isIntersecting) {
      await waitTime(100);
      cardOpacity();
      await waitTime(500);

      skillsFilterEffect();
    }
  },
  {
    root: null,
    threshold: 0.4,
  }
);

observerSkills.observe(cardsContainer);
//// Removes class that has opacity 0 into 1  ///
const cardOpacity = async function () {
  cards.forEach((card) => card.classList.remove("card__skills--hidden"));
};
///// adds a Class that gives each skill color by adding active class that(filter:grayscale 0%)///
const skillsFilterEffect = async function () {
  for (const skill of skills) {
    skill.classList.add("card__skills__skill--active");
    await waitTime(200);
  }
};
///////////////adds Class that set opacity to 0 ///////
const removeOpacity = function () {
  cards.forEach((card) => card.classList.add("card__skills--hidden"));
};
/////////// removes Filter effect (filter:grayscale 100%)
const removeSkillsEffect = function () {
  skills.forEach((skill) =>
    skill.classList.remove("card__skills__skill--active")
  );
};

///// Project section observers observs cards and pass functions into it///

projectsImg.forEach((img) => {
  const imgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("projects__image-2")
        ) {
          projectsDescription[1].style.animation =
            "slideIn-left 1.5s cubic-bezier(0.6, -0.05, 0.1, 0.99) both";
          verticalLineRight.classList.add("vertical__line");

          horizontalLineRight.classList.add("horizontal__line");
          imgObserver.unobserve(entry.target);
        } else if (
          entry.isIntersecting &&
          entry.target.classList.contains("projects__image-1")
        ) {
          verticalLineLeft.classList.add("vertical__line");
          // Slide in animation for project description//
          projectsDescription[0].style.animation =
            "slideIn-right 1.5s cubic-bezier(0.6, -0.05, 0.1, 0.99) both";

          await waitTime(1000);
          horizontalLineLeft.classList.add("horizontal__line");
          imgObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.7,
    }
  );

  imgObserver.observe(img);
});
