import { getPriorityColor, getPriorityLabel } from '../../utils/formatters';

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
        priority
      )}`}
    >
      {getPriorityLabel(priority)}
    </span>
  );
};

export default PriorityBadge;
