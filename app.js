// Listen For Submit Events
document.getElementById("loan-form").addEventListener("submit", 
function (e) {
    // Hide Results
    document.querySelector("#results").style.display = "none";

    // Show Loader
    document.querySelector("#loading").style.display = "block";

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

// Calculate Results
function calculateResults() {

    // UI vars Needed
    // Calculator
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const repayYears = document.querySelector("#years");

    // Results
    const monthlyPay = document.querySelector("#monthly-payment");
    const totalPay = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(repayYears.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    if (isFinite(monthly)){
        monthlyPay.value = monthly.toFixed(2);
        totalPay.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        // Show Results
        document.querySelector("#results").style.display = "block";

        // Hide Loader
        document.querySelector("#loading").style.display = "none";

    } else {
        showError("Please check your numbers...");
        console.log("Please check your numbers")
    };

};

// Show Error
function showError(error){

    // Hide Results
        document.querySelector("#results").style.display = "none";

        // Hide Loader
        document.querySelector("#loading").style.display = "none";

    const errorDiv = document.createElement("div");

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
};

function clearError() {
    document.querySelector(".alert").remove();
}