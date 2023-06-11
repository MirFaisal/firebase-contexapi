export const showTost = (tost_message) => {
  document.getElementById("tost_message").innerText = tost_message;
  const modal = document.getElementById("modal");
  modal.classList.remove("top-[-110%]");
  modal.classList.add("top-[30px]");
  const interval = setInterval(() => {
    modal.classList.remove("top-[30px]");
    modal.classList.add("top-[-110%]");
    cler();
  }, 4000);

  const cler = () => {
    clearInterval(interval);
  };
};
