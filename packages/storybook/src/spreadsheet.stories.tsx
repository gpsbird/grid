// @ts-nocheck
import React, { useState, useCallback } from "react";
import Spreadsheet, {
  Sheet,
  defaultSheets,
  DATATYPES,
} from "@rowsncolumns/spreadsheet";
import { parse, download } from "@rowsncolumns/export";
import CalcEngine from "@rowsncolumns/calc";

export default {
  title: "Spreadsheet",
  component: Spreadsheet,
};

// @ts-ignore
const newSheet = ({ count }: { count: number }): Sheet => ({
  name: `Sheet${count}`,
  cells: {},
});

export const Default = () => {
  const App = () => {
    const [sheets, setSheets] = useState(defaultSheets);
    return (
      <div
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          minHeight: 800,
        }}
      >
        <Spreadsheet
          sheets={sheets}
          onChangeCells={console.log}
          onChange={setSheets}
        />
      </div>
    );
  };
  return <App />;
};

export const Import = () => {
  const App = () => {
    const [sheets, setSheets] = useState(defaultSheets);
    const handleChangeFile = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const getSheets = async (file) => {
          const newSheets = await parse({ file });
          setSheets(newSheets.sheets);
        };
        getSheets(e.target.files[0]);
      },
      []
    );
    return (
      <div
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          minHeight: 800,
        }}
      >
        <div>
          <form id="testForm">
            <input
              type="file"
              name="test"
              id="testFile"
              onChange={handleChangeFile}
            />
          </form>
          <button onClick={() => download({ sheets, filename: "Hello" })}>
            Download Excel
          </button>
          <button
            onClick={() => download({ sheets, filename: "Hello", type: "csv" })}
          >
            Download CSV
          </button>
        </div>
        <Spreadsheet sheets={sheets} onChange={setSheets} />
      </div>
    );
  };
  return <App />;
};

Import.story = {
  name: "Import excel file",
};

export const ExportToExcel = () => {
  const App = () => {
    const [sheets, setSheets] = useState(defaultSheets);
    const handleExport = useCallback(({ sheets }) => {
      download({
        sheets,
        filename: "Report",
      });
    }, []);
    return (
      <>
        <br />
        <button onClick={() => handleExport({ sheets })}>
          Export to excel
        </button>
        <div
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "column",
            minHeight: 600,
          }}
        >
          <Spreadsheet sheets={sheets} onChange={setSheets} />
        </div>
      </>
    );
  };
  return <App />;
};

ExportToExcel.story = {
  name: "Export excel file",
};

export const FilterViews = () => {
  const App = () => {
    const initialSheets = [
      {
        name: "Sheet 1",
        id: 0,
        frozenRows: 1,
        frozenColumns: 1,
        hiddenRows: [],
        activeCell: null,
        selections: [],
        cells: {
          1: {
            1: {
              text: "First Name",
            },
            2: {
              text: "Last Name",
            },
            3: {
              text: "Gender",
            },
          },
          2: {
            1: {
              text: "Dulce",
            },
            2: {
              text: "Abril",
            },
            3: {
              text: "Female",
            },
          },
          3: {
            1: {
              text: "Mara",
            },
            2: {
              text: "Hashimoto",
            },
            3: {
              text: "Male",
            },
          },
          4: {
            1: {
              text: "EMara",
            },
            2: {
              text: "Hashimoto",
            },
            3: {
              text: "Male",
            },
          },
          5: {
            5: {
              text: "First name",
            },
            6: {
              text: "Last name",
            },
            7: {
              text: "Gender",
            },
          },
          6: {
            5: {
              text: "EMara",
            },
            6: {
              text: "Hashimoto",
            },
            7: {
              text: "Male",
            },
          },
        },
        filterViews: [
          {
            bounds: {
              top: 1,
              bottom: 5,
              left: 1,
              right: 3,
            },
          },
          {
            bounds: {
              top: 5,
              bottom: 8,
              left: 5,
              right: 7,
            },
          },
        ],
      },
    ];
    return <Spreadsheet initialSheets={initialSheets} />;
  };

  return <App />;
};

const initialValidationSheet: Sheet[] = [
  {
    name: "Sheet 1",
    id: 0,
    activeCell: null,
    selections: [],
    cells: {
      2: {
        2: {
          text: "",
          valid: false,
          dataValidation: {
            prompt: "Enter a country",
            type: "list",
            formulae: ["Singapore", "Japan", "China"],
          },
        },
      },
      3: {
        2: {
          text: "",
          valid: false,
          dataValidation: {
            prompt: "Something went wrong",
            allowBlank: true,
            formulae: [10, 100],
            operator: "between",
            type: "decimal",
          },
        },
      },
      4: {
        2: {
          text: "TRUE",
          datatype: "boolean",
          dataValidation: {
            allowBlank: true,
            type: "boolean",
            prompt: "Invalid entry",
            formulae: ["TRUE", "FALSE"],
          },
        },
      },
      5: {
        2: {
          datatype: "hyperlink",
          text: "Hello world",
          color: "#1155CC",
          underline: true,
          hyperlink: "http://google.com",
        },
      },
      6: {
        2: {
          datatype: "formula",
          text: "=SUM(A1,A2)",
          result: "4",
          error: "#VALUE!",
        },
      },
      7: {
        2: {
          text: "tooltip",
          tooltip: "hello world",
        },
        3: {
          text: "12",
          dataValidation: {
            type: "decimal",
            operator: "between",
            formulae: [0, 10],
            prompt: "Please enter a valid number between 0 and 10",
          },
        },
      },
    },
  },
];
export const DataValidation = () => {
  const App = () => {
    const [sheets, setSheets] = useState<Sheet[]>(initialValidationSheet);
    return (
      <>
        <div
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "column",
            minHeight: 800,
          }}
        >
          <Spreadsheet sheets={sheets} onChange={setSheets} />
        </div>
      </>
    );
  };
  return <App />;
};

export const UsingStateReducer = () => {
  const App = () => {
    const [sheets, setSheets] = useState<Sheet[]>();
    const stateReducer = useCallback((state, action) => {
      console.log(state, action);
      return state;
    }, []);
    return (
      <>
        <div
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "column",
            minHeight: 800,
          }}
        >
          <Spreadsheet sheets={sheets} stateReducer={stateReducer} />
        </div>
      </>
    );
  };
  return <App />;
};

export const CustomDataType = () => {
  const App = () => {
    const sheets: Sheet[] = [
      {
        name: "Sheet 1",
        id: 1,
        activeCell: null,
        selections: [],
        cells: {
          1: {
            2: {
              datatype: "boolean",
              type: "hello",
            },
          },
        },
      },
    ];
    return <Spreadsheet sheets={sheets} />;
  };
  return <App />;
};

export const ProtectedSheet = () => {
  const App = () => {
    const sheets: Sheet[] = [
      {
        name: "Protected sheet",
        id: 1,
        activeCell: null,
        selections: [],
        locked: true,
        cells: {
          1: {
            2: {
              datatype: "boolean",
              type: "hello",
            },
          },
        },
      },
      {
        name: "Hidden sheet",
        id: 2,
        activeCell: null,
        selections: [],
        hidden: true,
        cells: {
          1: {
            2: {
              datatype: "boolean",
              type: "hello",
            },
          },
        },
      },
    ];
    return <Spreadsheet minHeight={600} initialSheets={sheets} />;
  };
  return <App />;
};

export const TabColors = () => {
  const App = () => {
    const sheets: Sheet[] = [
      {
        name: "Sheet 1",
        id: 1,
        activeCell: null,
        selections: [],
        tabColor: "red",
        cells: {
          1: {
            2: {
              datatype: "boolean",
              type: "hello",
            },
          },
        },
      },
    ];
    return <Spreadsheet minHeight={600} sheets={sheets} />;
  };
  return <App />;
};

export const Formula = () => {
  const calcEngine = new CalcEngine({
    functions: {
      FETCH_CSV: async (arg) => {
        return fetch(arg.value)
          .then((r) => r.text())
          .then((response) => {
            const data = [];
            const rows = response.split("\n");
            for (const row of rows) {
              const cols = row.split(",");
              data.push(cols);
            }
            return data;
          });
      },
    },
  });
  const App = () => {
    const initialSheets: Sheet[] = [
      {
        name: "Sheet1",
        id: "1",
        activeCell: null,
        selections: [],
        tabColor: "red",
        cells: {
          1: {
            2: {
              datatype: "formula",
              // text: '=HYPERLINK("Google", www.google.com)'
              // text: '=HYPERLINK("asdas")'
              // text: '=CONCAT(A1, "hello")'
              text: "=MMULT({1,5;2,3},{1,2;2,3})",
            },
          },
          // 2: {
          //   2: {
          //     datatype: "formula",
          //     text: "=HELLO()"
          //   }
          // }
        },
      },
    ];
    const [sheets, setSheets] = useState(initialSheets);
    return (
      <Spreadsheet
        minHeight={600}
        sheets={sheets}
        onChange={setSheets}
        functions={{
          FETCH_CSV: async (arg) => {
            return fetch(arg.value)
              .then((r) => r.text())
              .then((response) => {
                const data = [];
                const rows = response.split("\n");
                for (const row of rows) {
                  const cols = row.split(",");
                  data.push(cols);
                }
                return data;
              });
          },
        }}
      />
    );
  };
  return <App />;
};
