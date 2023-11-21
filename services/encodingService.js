export class EncodingService {
    static async checkEncoding(formData) {
        console.log(formData)
        try {
            const response = await fetch("http://127.0.0.1:80/file", {
                method: "POST",
                body: formData,
            });
            const result = response.json();
            console.log("Success:", result);
            return result;
        } catch (error) {
            console.log("Error:", error);
            return "Error"
        }
    } 
}

  