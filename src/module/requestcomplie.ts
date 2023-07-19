type Output = {
    output: string;
    status: string;
}

export const CompileRequest = async (code: string, stdin: string, ctype: string):Promise<Output | null> => {
    try{
        const Id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString();

        const response = await fetch("http://localhost:3000/api/compile", {
            method: "POST",
            body: JSON.stringify({
                code,
                ctype,
                input: stdin,
                id: Id
            }),
            headers:{
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        return result;
    }catch(error : any){
        return {
            status: "error",
            output: error.toString()
        };
    }
}

export default CompileRequest;