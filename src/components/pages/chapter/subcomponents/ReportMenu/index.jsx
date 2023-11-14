import React, { useCallback, useContext, useState } from "react";
import { ReactComponent as MenuIcon } from "assets/vectors/menu.svg";
import { ReactComponent as Flag } from "assets/vectors/flag.svg";
import { Menu, MenuItem } from "@material-ui/core";
import Button from "components/global/Button";
import Modal from "components/global/Modal";
import "./reportMenu.scss";
import axios from "axios";
import { API_URL } from "config/constants";
import { AccountContext } from "providers/AccountContext";

function ReportMenu({ userType, tag }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [, setReportSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    user: { username },
  } = useContext(AccountContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportSend = useCallback(async () => {
    setLoading(true);
    await axios
      .post(`${API_URL}/report/add`, {
        tag,
        username,
        reason: reportReason,
      })
      .then(() => {
        setReportSent(true);
        setReportModalOpen(false);
      })
      .catch(console.error);
    setLoading(false);
  }, [reportReason, tag, username]);

  return (
    <div className='report-menu'>
      <Button
        iconButton
        variant='transparent'
        onClick={handleClick}
        id='report-button'
        className='report-menu__button'
        aria-controls={anchorEl ? "report-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={anchorEl ? "true" : undefined}>
        <MenuIcon />
      </Button>

      <Menu
        id='report-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "report-button",
          className: "report-menu__list",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem
          onClick={() => {
            handleClose();
            setReportModalOpen(true);
          }}
          className='report-menu__item'>
          <Flag /> REPORT
        </MenuItem>
      </Menu>

      <Modal
        isOpen={reportModalOpen}
        onClickOutside={() => setReportModalOpen(false)}
        className='report-menu__modal'>
        <h1>Report {userType}</h1>
        <p>
          Flagged users are reviewed by Munkai staff and accounts
          are penalized for Community Guidelines violations.
          Describe why you think this user is inappropriate.
        </p>

        <textarea
          placeholder='Your reason'
          onChange={(e) => setReportReason(e.target.value)}></textarea>
        <Button isLoading={loading} onClick={handleReportSend}>
          Report
        </Button>
      </Modal>
    </div>
  );
}

export default ReportMenu;
