import s from "./leadslist.module.scss";

const LeadsList = ({
  headers = [],
  data = [],
  renderRow,
  containerStyle = {},
}) => {
  const columnCount = headers.length;

  const gridStyle = containerStyle.gridTemplateColumns
    ? containerStyle
    : { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  return (
    <div className={s.rawLeads}>
      <div className={s.rawLeadsHeader} style={gridStyle}>
        {headers.map((header, i) => (
          <span key={i}>{header}</span>
        ))}
      </div>

      <div className={s.rawLeadsScroll}>
        {data.map((item, index) => (
          <div className={s.rawLeadsRow} key={index} style={gridStyle}>
            {renderRow(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsList;
