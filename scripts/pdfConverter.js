
document.querySelector("#submit").addEventListener("click", function(){
    // creating a pdf doc object by jsPDF library
    let {jsPDF} = window.jspdf;
    let pdf= new jsPDF();
    
    // Getting the form data
    let srNo=document.querySelector("#srNo").value;
    let rollNo=document.querySelector("#rollNo").value;
    let name=document.querySelector("#name").value;
    let fatherName=document.querySelector("#fatherName").value;
    let motherName=document.querySelector("#motherName").value;
    let dob=document.querySelector("#dob").value;
    let gender;
    let genderElement=document.getElementsByName("gender");
    for(let i=0;i<genderElement.length;i++){
        if(genderElement[i].checked){
            gender=genderElement[i].value
        }
    };
    let classEnroll=document.querySelector("#class").value
    let phone=document.querySelector("#phone").value
    let aadhar=document.querySelector("#aadhar").value
    let email=document.querySelector("#email").value
    let address=document.querySelector("#address").value
    let upload=document.querySelector("#upload").value;
    let checkbox=document.querySelector("#checkbox")
    if(srNo=="" || rollNo=="" || name=="" || fatherName=="" || dob=="" || gender=="" || classEnroll=="Select Class" || phone=="" || upload==""){
        alert("Please fill the required fields");
        return false
    }
    else if(address.length>80){
        alert("Address length should be less than 80 characters")
    }
    else if(!checkbox.checked){
        alert("You must agree to the declaration first.");
        return false;
    }
    else{
        // Create a new pdf
        pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10, 'S');

        // Setting watermark
        let watermarkText = "RIVERDALE PUBLIC SCHOOL";
        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setFontSize(30);
        pdf.setTextColor(241, 245, 254);
        let textWidth = pdf.getTextDimensions(watermarkText).w;
        let textHeight = pdf.getTextDimensions(watermarkText).h;
        pdf.text(watermarkText, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, pdf.internal.pageSize.getHeight() / 2);

        //setting Header
        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setTextColor(0, 0, 0);
        let header1 = "RIVERDALE PUBLIC SCHOOL";
        textWidth = pdf.getTextDimensions(header1).w;
        pdf.text(header1, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 30)

        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setFontSize(20);
        let header3 = "ADMISSION FORM";
        textWidth = pdf.getTextDimensions(header3).w;
        pdf.text(header3, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 50);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        let header2 = "MARWAN BHOJ, MUZAFFARPUR";
        textWidth = pdf.getTextDimensions(header2).w;
        pdf.text(header2, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 40)

        pdf.setFontSize(14);
        pdf.setLineHeightFactor(1.5);
        let body = `Sr.No.: ${srNo}\nStudent Name: ${name}\nFather's Name: ${fatherName}\nMother's Name: ${motherName}\nDate of Birth: ${dob}\nGender: ${gender}\nClass: ${classEnroll}\nPhone: ${phone}\nAadhar No.: ${aadhar}\nEmail: ${email}\nAddress: ${address}\n\nDeclaration:\nI have read the general rules and regulation of the school as given in the prospectus.\nI am satisfied that these are good and necessary for the institution.`;
        pdf.text(body, 10, 70);

        pdf.text("Management", 150, 190);
        pdf.text("-------------------------------------------------------------------------------------------------------------------", 10, 200)

        // Office Use only
        let officeUse = "FOR OFFICE USE ONLY"
        textWidth = pdf.getTextDimensions(officeUse).w;
        pdf.text(officeUse, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 210);
        pdf.text("Mob: +91 9113711647", 140, 220)
        pdf.text(`Sr.No.: ${srNo}`, 10, 230)
        pdf.text(`Student Name: ${name}`, 10, 238);
        if (gender == "Female") {
            pdf.text(`D/o: ${fatherName}`, 10, 246);
        }
        else {
            pdf.text(`S/o: ${fatherName}`, 10, 246);
        }
        pdf.text(`Class: ${classEnroll}\nRoll No.: ${rollNo}`, 10, 254);
        pdf.text("Received By", 160, 280);

        //Inserting image
        let image = document.querySelector("#upload");
        let file = image.files[0];
        let reader = new FileReader()
        reader.onload = function (event) {
            let img = new Image()
            // img.crossOrigin = "Anonymous";
            img.src = event.target.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                let imgData = canvas.toDataURL('image/jpeg');
                let imgWidth = 40;
                let imgHeight = (imgWidth * img.height) / img.width;
                pdf.addImage(imgData, "JPEG", 150, 60, imgWidth, imgHeight);
                pdf.save(`${name}.pdf`);
            }
        }



        // saving the pdf file


        reader.readAsDataURL(file)
        }

})
// limiting the image size
let image=document.querySelector("#upload")
image.onchange=function(){
    let fileSize=Math.round(this.files[0].size/1024)
    if(fileSize<50){
        alert("Image size is too small.")
        this.value=""
    }
    else if(fileSize>300){
        alert("Image size is too big.")
        this.value=""
    }
}