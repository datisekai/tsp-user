import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { TableSchema } from "../../types/table";
import { useDevice } from "../../hooks";
import MyCard from "./MyCard";
import { getIndex } from "../../utils";

export interface IActionTable {
  title?: string;
  icon?: string;
  onClick?: (data: any, options: any) => void;
  type?: "button" | "file";
  disabled?: boolean;
  iconPos?: "right" | "left";
  severity?: "success" | "info" | "warning" | "danger" | "help" | "secondary";
  loading?: boolean;
  action?: "back";
  tooltip?: string;
  isHidden?: (record: any) => boolean
}
export interface QueryParams {
  page?: number;
  [key: string]: any;
}
interface IMyTable {
  schemas: TableSchema[];
  data: any[];
  keySearch?: string;
  totalRecords?: number;
  perPage?: number;
  onChange?: (query: object) => void;
  actions?: IActionTable[];
  isLoading?: boolean;
}

const MyTable: FC<IMyTable> = ({
  data = [],
  schemas = [],
  keySearch = "",
  totalRecords = 0,
  perPage = 10,
  onChange,
  actions = [],
  isLoading = false,
}) => {
  const [first, setFirst] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const menuRight = useRef<Menu>(null);
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const { isMobile } = useDevice();

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = Math.max(1, event.page + 1);
    setFirst(page);
  };

  useEffect(() => {
    if (onChange && typeof onChange == "function") {
      const query: any = {
        page: first
      }
      if (keySearch) {
        query[keySearch] = debouncedValue
      }
      onChange(query);
    }
  }, [debouncedValue, first]);

  const handleMenuClick = (event: any, rowData: any) => {
    setSelectedRowData(rowData);
    menuRight?.current?.toggle(event);
  };

  const bodyTemplate = (row: any, options: any) => {
    const key = options.field;

    const schema = schemas.find((item) => item.prop === key);
    const value = row[key] || "";
    if (schema?.render && typeof schema.render == "function") {
      return schema.render(value, row);
    }
    if (schema?.prop === 'index') {
      return getIndex(options.rowIndex, perPage, first);
    }
    switch (schema?.type) {
      case "text":
      case "number":
        return <span>{value}</span>;
      case "date":
        return <span>{dayjs(value).format("DD/MM/YYYY")}</span>;
      case "datetime":
        return <span>{value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "Chưa có"}</span>;
      case "badge":
        if (schema?.getBadge && typeof schema.getBadge === "function") {
          const { severity, value: renderValue } = schema.getBadge(value);
          return <Tag value={renderValue} severity={severity} />;
        }
        return <span>{value}</span>;
      default:
        return <span>{value}</span>;
    }
  };

  const renderHeader = useCallback(() => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            onChange={(event) => setValue(event.target.value)}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  }, [keySearch]);


  const getActions = (actions: IActionTable[], row: any) => {
    return actions.filter((action) => {
      if (action && action.isHidden && typeof action.isHidden == 'function') {
        return !action.isHidden(row)
      }
      return true;
    });
  }

  const renderActions = useCallback(
    (rowData: any, options: any) => {
      const actionActives = getActions(actions, rowData);
      const items = [
        {
          label: "Hành động",
          items: actionActives.map((action) => ({
            label: action.tooltip,
            icon: `pi ${action.icon}`,
            command: () => {
              if (action.onClick) {
                action.onClick(selectedRowData, options);
              }
            },
          })),
        },
      ];


      return (
        <div className="tw-w-full tw-flex tw-gap-2 tw-flex-wrap tw-items-center">
          {actionActives && actionActives.length > 0 && (
            <div
              className={
                actionActives.length < 4 ? "tw-flex md:tw-hidden" : "tw-flex"
              }
            >
              <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
                aria-hidden="false"
              />
              <Button
                size="small"
                icon="pi pi-angle-down"
                className="mr-2"
                onClick={(event) => handleMenuClick(event, rowData)}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
            </div>
          )}
          {actionActives?.map((action, index) => (
            <Button
              size="small"
              className={
                actionActives.length < 4 ? "md:tw-flex tw-hidden" : "tw-hidden"
              }
              tooltip={action.tooltip}
              tooltipOptions={{ position: "top" }}
              loading={action.loading}
              disabled={action.disabled}
              key={index}
              severity={action.severity}
              onClick={() => {
                if (action.onClick) {
                  action.onClick(rowData, options);
                }
              }}
              label={action.title}
              iconPos={action.iconPos || "left"}
              icon={`pi ${action.icon}`}
            />
          ))}
        </div>
      );
    },
    [actions, selectedRowData]
  );

  return (
    <>
      {!isMobile ? (
        <MyCard >
          <DataTable
            loading={isLoading}
            value={data}
            header={keySearch ? renderHeader() : null}
            tableStyle={{ minWidth: "10rem" }}
          >
            {schemas.map((schema) => (
              <Column
                body={bodyTemplate}
                key={schema.prop}
                field={schema.prop}
                header={schema.label}
                style={{ minWidth: schema.minWidth || "50px" }}
              />
            ))}
            {actions && actions.length > 0 && (
              <Column body={renderActions} field="actions" header="Thao tác" />
            )}
          </DataTable>
          {totalRecords > perPage && (
            <Paginator
              first={first * perPage - 1}
              rows={perPage}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          )}
        </MyCard>
      ) : (
        <div className="tw-space-y-2">
          {data.map((item, i) => {
            return (
              <MyCard key={item.id}>
                {schemas.map((s) => {
                  return (
                    <div key={s.prop}>
                      {s.label}:{" "}
                      <strong>{bodyTemplate(item, { field: s.prop, rowIndex: i })}</strong>
                    </div>
                  );
                })}

                <div className="tw-mt-2 tw-space-x-2">
                  {getActions(actions, item)?.map((action, index) => (
                    <Button
                      size="small"
                      tooltip={action.tooltip}
                      tooltipOptions={{ position: "top" }}
                      loading={action.loading}
                      disabled={action.disabled}
                      key={index}
                      severity={action.severity}
                      onClick={() => {
                        if (action.onClick) {
                          action.onClick(item, {});
                        }
                      }}
                      label={action.title}
                      iconPos={action.iconPos || "left"}
                      icon={`pi ${action.icon}`}
                    />
                  ))}
                </div>
              </MyCard>
            );
          })}
          {data?.length == 0 && <MyCard>
            {schemas.map((s) => {
              return (
                <div >
                  {s.label}:{" "}
                  <strong>---</strong>
                </div>
              );
            })}</MyCard>}
        </div>
      )}
    </>
  );
};

export default memo(MyTable);
