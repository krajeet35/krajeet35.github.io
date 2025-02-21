
document.querySelector("#submit").addEventListener("click", function(){
    // creating a pdf doc object by jsPDF library
    let {jsPDF} = window.jspdf;
    let pdf= new jsPDF();
    
    // Getting the form data
    let getDate=document.querySelector("#selectDate").value;
    let [year,month,day]=getDate.split('-')
    getDate=`${day}-${month}-${year}`
    let rollNo=document.querySelector("#rollNo").value;
    let name=document.querySelector("#name").value;
    let fatherName=document.querySelector("#fatherName").value;    
    let classEnroll=document.querySelector("#class").value    
    let upload=document.querySelector("#upload").value;

   
    if(getDate=="" || rollNo=="" || name=="" || fatherName=="" || classEnroll=="Select Class" || upload==""){
        alert("Please fill the required fields");
        return false
    }
    else{
        // Create a new pdf
        pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height/2, 'S');

        // Setting watermark
        let watermarkText = "RIVERDALE PUBLIC SCHOOL";
        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setFontSize(30);
        pdf.setTextColor(241, 245, 254);
        let textWidth = pdf.getTextDimensions(watermarkText).w;
        let textHeight = pdf.getTextDimensions(watermarkText).h;
        pdf.text(watermarkText, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, (pdf.internal.pageSize.getHeight() / 2)/2);

        //setting Header
        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setTextColor(0, 0, 0);
        let header1 = "RIVERDALE PUBLIC SCHOOL";
        textWidth = pdf.getTextDimensions(header1).w;
        pdf.text(header1, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 20)

        pdf.setFont("Helvetica", "BoldOblique");
        pdf.setFontSize(20);
        let header3 = "Admit card for annual examination 2024-25";
        textWidth = pdf.getTextDimensions(header3).w;
        pdf.text(header3, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 40);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        let header2 = "MARWAN BHOJ, MUZAFFARPUR";
        textWidth = pdf.getTextDimensions(header2).w;
        pdf.text(header2, pdf.internal.pageSize.getWidth() / 2 - textWidth / 2, 30)

        pdf.setFontSize(14);
        pdf.setLineHeightFactor(1.5);
        let body = `Date: ${getDate}\nStudent Name: ${name}\nFather's Name: ${fatherName}\nClass: ${classEnroll}\nShift-I: 9:00 -10:00 AM\nShift-II: 10:00 -11:00 AM`;
        pdf.text(body, 10, 50);
        let yCordinate=90;
        let xCordinate=10;
        if(classEnroll == "Play" || classEnroll == "Nursery" || classEnroll == "LKG" || classEnroll == "UKG"){
            let headers=['Date', 'Day', 'Shift-I', 'Shift-II']
            let data1=[['24-02-2025','Monday','Hindi','English'],['25-02-2025','Tuesday','Mathematics','Drawing'],['27-02-2025','Thursday','Music','']]
            headers.forEach(header => {
                pdf.rect(xCordinate,yCordinate,40,10)
                pdf.text(header, xCordinate+2, yCordinate+5);
                xCordinate+=40
            });
            xCordinate=10;
            yCordinate=100
            data1.forEach(row=>{
                row.forEach(cell=>{
                    pdf.rect(xCordinate,yCordinate,40,10)
                    pdf.text(cell, xCordinate+2,yCordinate+5)
                    xCordinate+=40;
                })
                xCordinate=10;
                yCordinate+=10
            })
        }
        else{
            let headers=['Date', 'Day', 'Shift-I', 'Shift-II']
            let data1=[['24-02-2025','Monday','Hindi','Sanskrit'],['25-02-2025','Tuesday','English','Mathematics'],['27-02-2025','Thursday','Science','S.S.T.'],['28-02-2025','Friday','G.K.','Computer']]
            headers.forEach(header => {
                pdf.rect(xCordinate,yCordinate,40,10)
                pdf.text(header, xCordinate+2, yCordinate+5);
                xCordinate+=40
            });
            xCordinate=10;
            yCordinate=100
            data1.forEach(row=>{
                row.forEach(cell=>{
                    pdf.rect(xCordinate,yCordinate,40,10)
                    pdf.text(cell, xCordinate+2,yCordinate+5)
                    xCordinate+=40;
                })
                xCordinate=10;
                yCordinate+=10
            })
        }

        pdf.text("Principal Signature", 10, 150);
        pdf.text("Student Signature", 150, 150);
        // pdf.text("-------------------------------------------------------------------------------------------------------------------", 10,170)

       
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
                pdf.addImage(imgData, "JPEG", 150, 50, imgWidth, imgHeight);
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
    let fileSize=Math.round(this.files[0].size/2048)
    if(fileSize<20){
        alert("Image size is too small.")
        this.value=""
    }
    else if(fileSize>2049){
        alert("Image size is too big.")
        this.value=""
    }
}