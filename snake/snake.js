document.addEventListener("DOMContentLoaded", () => {
    const openRulesBtn = document.getElementById("open-rules");
    const modal = document.getElementById("rules-modal");
    const closeModal = document.querySelector(".modal .close");

    openRulesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex"; 
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

