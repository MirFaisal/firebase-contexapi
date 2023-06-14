export const showTost = (tost_message) => {
  document.getElementById("tost_message").innerText = tost_message;
  const modal = document.getElementById("modal");
  modal.classList.remove("top-[-100%]");
  modal.classList.add("top-[100px]");
  const interval = setInterval(() => {
    modal.classList.remove("top-[100px]");
    modal.classList.add("top-[-100%]");
    cler();
  }, 4000);

  const cler = () => {
    clearInterval(interval);
  };
};
