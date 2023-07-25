type Output = {
    output: string;
    status: string;
    result?: string;
    expected?: string;
}

export const CompileRequest = async (code: string, stdin: string, ctype: string, grader:boolean, solution?:string):Promise<Output | null> => {
    try{
        const Id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString();

        const response = await fetch(import.meta.env.VITE_api+"/api/compile", {
            method: "POST",
            body: JSON.stringify({
                code,
                ctype,
                input: stdin,
                id: Id,
                grade: grader || false,
                sol:solution
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