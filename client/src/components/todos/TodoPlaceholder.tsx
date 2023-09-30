import { ReactElement } from "react";

const TodoPlaceholder = ({
  placeholder,
}: {
  placeholder: string;
}): ReactElement => {
  return (
    <section
      className={`placeholder-container ${placeholder} d-flex align-items-center justify-content-center w-50 message-div flex-column px-3 py-3`}
    >
      <div data-testid="placeholder" className="ui placeholder w-100">
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </section>
  );
};

export default TodoPlaceholder;
