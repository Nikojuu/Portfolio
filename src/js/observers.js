const cardsContainer = document.querySelector(".cards-container");
const cards = document.querySelectorAll(".card__skills");
const skills = document.querySelectorAll(".card__skills__skill");
const projectsImg = document.querySelectorAll(".projects__image");
const verticalLineLeft = document.querySelectorAll(".vertical__line-left");
const verticalLineLeft2 = document.querySelector(".vertical__line-left-2");
const verticalLineRight = document.querySelector(".vertical__line-right");
const horizontalLineLeft = document.querySelectorAll(".horizontal__line-left");
const horizontalLineLeft2 = document.querySelector(".horizontal__line-left-2");
const horizontalLineRight = document.querySelector(".horizontal__line-right");
const projectsDescription = document.querySelectorAll(".projects__description");
const leftArticle = document.querySelectorAll(".article__left");
const articleText = document.querySelectorAll(".article p");
const sertificates = document.querySelector(".sertificate");
const projects = document.querySelector(".projects");
const sertificateCards = document.querySelectorAll(".sertificate__card");
const projectCards = document.querySelectorAll(".projects__card");
const serviceContainer = document.querySelector(".services-container");
const serviceCards = document.querySelectorAll(".services-card");
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
    await waitTime(100);
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
          entry.target.classList.contains("projects__image-1")
        ) {
          projectsDescription[1].style.animation =
            "slideIn-left 1.5s cubic-bezier(0.6, -0.05, 0.1, 0.99) both";
          verticalLineRight.classList.add("vertical__line");

          horizontalLineRight.classList.add("horizontal__line");
          imgObserver.unobserve(entry.target);
        }
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("projects__image-2")
        ) {
          projectsDescription[2].style.animation =
            "slideIn-right 1.5s cubic-bezier(0.6, -0.05, 0.1, 0.99) both";
          verticalLineLeft2.classList.add("vertical__line");

          horizontalLineLeft2.classList.add("horizontal__line");
          imgObserver.unobserve(entry.target);
        }

        if (
          entry.isIntersecting &&
          entry.target.classList.contains("projects__image-3")
        ) {
          // vertical and horizontal line [0] as in first instance projects section in this case
          verticalLineLeft[0].classList.add("vertical__line");
          // Slide in animation for project description//
          projectsDescription[0].style.animation =
            "slideIn-right 1.5s cubic-bezier(0.6, -0.05, 0.1, 0.99) both";

          await waitTime(1000);

          horizontalLineLeft[0].classList.add("horizontal__line");
          imgObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.4,
    }
  );

  imgObserver.observe(img);
});

///// Observer sertificates & About & Services///
const observerSertificates = new IntersectionObserver(
  async (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      return;
    } else if (
      entry.isIntersecting &&
      entry.target.classList.contains("article")
    ) {
      if (entry.target === leftArticle[0]) {
        skillsTextAnimation(2);
        observerSertificates.unobserve(leftArticle[0]);
      } else if (entry.target === leftArticle[1]) {
        skillsTextAnimation(3);
        verticalLineLeft[1].classList.add("vertical__line");
        horizontalLineLeft[1].classList.add("horizontal__line");
        observerSertificates.unobserve(leftArticle[1]);
      }
    } else if (
      entry.isIntersecting &&
      entry.target.classList.contains("sertificate")
    ) {
      cardAnimation(sertificateCards);
      observerSertificates.unobserve(sertificates);
    } else if (
      entry.isIntersecting &&
      entry.target.classList.contains("projects")
    ) {
      cardAnimation(projectCards);
      observerSertificates.unobserve(projects);
    } else if (
      entry.isIntersecting &&
      entry.target.classList.contains("services-container")
    ) {
      cardAnimation(serviceCards);
    }
  },
  {
    root: null,
    threshold: 0.4,
  }
);

observerSertificates.observe(leftArticle[0]);
observerSertificates.observe(sertificates);
observerSertificates.observe(projects);
observerSertificates.observe(leftArticle[1]);
observerSertificates.observe(serviceContainer);
// Sertificate functions//

const skillsTextAnimation = async function (paragraphNumber) {
  for (let i = articleText.length - 1; i >= 0; i--) {
    if (i <= paragraphNumber && i < 2 && paragraphNumber < 3) {
      // animate the first two paragraphs
      articleText[i].classList.add("active");

      await waitTime(500);
    } else if (i >= paragraphNumber - 1 && i >= 2 && paragraphNumber === 3) {
      // animate only the third paragraph
      articleText[i].classList.add("active");

      await waitTime(300);
    }
  }
};

const cardAnimation = async function (cards) {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.classList.add("active");
    await waitTime(200);
  }
};
