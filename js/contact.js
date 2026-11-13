/* =========================================
   CONTACT FORM CONFIGURATION
========================================= */

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjywgrbn";


/* =========================================
   CONTACT FORM HANDLING
========================================= */

if (contactForm && formFeedback) {

    // Improve screen-reader announcements.
    formFeedback.setAttribute("role", "status");
    formFeedback.setAttribute("aria-live", "polite");
    formFeedback.setAttribute("aria-atomic", "true");


    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* =====================================
           1. VALIDATE FORM
        ===================================== */

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();
            return;

        }


        /* =====================================
           2. PREPARE SUBMIT BUTTON
        ===================================== */

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        let originalButtonText = "";

        if (submitButton) {

            originalButtonText =
                submitButton.tagName === "INPUT"
                    ? submitButton.value
                    : submitButton.textContent;

            submitButton.disabled = true;

            if (submitButton.tagName === "INPUT") {
                submitButton.value = "Sending...";
            } else {
                submitButton.textContent = "Sending...";
            }

        }


        /* =====================================
           3. CLEAR PREVIOUS FEEDBACK
        ===================================== */

        formFeedback.textContent = "";

        formFeedback.classList.remove("success", "error");


        /* =====================================
           4. SEND MESSAGE TO FORMSPREE
        ===================================== */

        try {

            const response = await fetch(FORMSPREE_ENDPOINT, {

                method: "POST",

                body: new FormData(contactForm),

                headers: {
                    Accept: "application/json"
                }

            });


            /* =====================================
               5. HANDLE RESPONSE
            ===================================== */

            if (!response.ok) {

                let errorMessage =
                    "Something went wrong. Please try again.";

                try {

                    const result = await response.json();

                    if (result.errors?.length) {

                        errorMessage = result.errors
                            .map(error => error.message)
                            .join(", ");

                    }

                } catch {
                    // Keep the default error message if the response
                    // is not valid JSON.
                }

                throw new Error(errorMessage);

            }


            /* =====================================
               6. SUCCESS
            ===================================== */

            formFeedback.textContent =
                "Thank you! Your message has been sent successfully.";

            formFeedback.classList.add("success");

            contactForm.reset();


        } catch (error) {


            /* =====================================
               7. ERROR HANDLING
            ===================================== */

            console.error("Contact form submission failed:", error);

            formFeedback.textContent =
                error.message ||
                "Unable to send your message. Please try again.";

            formFeedback.classList.add("error");


        } finally {


            /* =====================================
               8. RESTORE SUBMIT BUTTON
            ===================================== */

            if (submitButton) {

                submitButton.disabled = false;

                if (submitButton.tagName === "INPUT") {
                    submitButton.value =
                        originalButtonText || "Send Message";
                } else {
                    submitButton.textContent =
                        originalButtonText || "Send Message";
                }

            }

        }

    });

}