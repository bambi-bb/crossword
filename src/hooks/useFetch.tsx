import Papa from "papaparse";

type Callback = (data: any) => void;

const useFetch = () => {
  const fetchCSVData = async (filePath: string, callback: Callback) => {
    const response = await fetch(filePath);
    const reader = response.body!.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csvString = decoder.decode(result.value!);
    const { data } = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      delimiter: ";",
    });
    callback(data);
  };

  return {
    fetchCSVData,
  };
};

export default useFetch;
