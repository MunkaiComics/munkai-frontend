import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as ArrowDown } from "assets/vectors/arrow-down.svg";
import Button from "./Button";
import TermsAndConditions from "./TermsAndConditions";
import { Web3Context } from "providers/Web3Context";
import { AccountContext } from "providers/AccountContext";
import axios from "axios";
import { API_URL, BECOME_ARTIST_MESSAGE } from "config/constants";
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

function ArtistForm() {
  const [othersPage, setOthersPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genresLoading, setGenresLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    telegramId: "",
    twitterId: "",
    chapterPerVolume: "",
    genre: [],
    otherGenre: "",
  });
  const { provider } = useContext(Web3Context);
  const { user, setUser } = useContext(AccountContext);

  useEffect(() => {
    if (!genresLoading && genres.length === 0) {
      setGenresLoading(true);
      axios
        .get(`${API_URL}/extra/genres`)
        .then((res) => {
          setGenres(res.data.data.map((e) => e.name.toUpperCase()));
        })
        .catch(console.error)
        .finally(() => setGenresLoading(false));
    }
  }, [genresLoading, genres]);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      const signer = provider.getSigner();
      const signature = await signer.signMessage(BECOME_ARTIST_MESSAGE);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/artist/create`,
        values,
        {
          auth: {
            username: user.address,
            password: signature,
          },
        }
      );
      const userResponse = await axios.get(`${API_URL}/user/${user.username}`);
      setUser(userResponse.data.data);
      await Promise.resolve(0);
      history.replace("/creator");
    } catch (error) {
      // Check if error is axios error
      console.error(error);
      if (error.response) {
        throw error;
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-card mx-auto py-5 px-5'>
      <h3 className='mb-1'>Become a Creator</h3>
      <p className='mb-4 artist-form-action'>
        Please, fill in the form below to become a Creator
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!othersPage) setOthersPage(true);
          else handleSubmit(e);
        }}>
        {!othersPage ? (
          <>
            <div className='row mb-4'>
              <div className='col-md-6 first-name'>
                <input
                  type='text'
                  className='form-control'
                  id='validationDefault01'
                  placeholder='Firstname'
                  name='firstName'
                  required
                  value={values.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='col-md-6'>
                <input
                  type='text'
                  className='form-control'
                  id='validationDefault01'
                  placeholder='Lastname'
                  required
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='mb-4'>
              <input
                type='text'
                className='form-control'
                id='validationDefault01'
                placeholder='Telegram ID'
                required
                name='telegramId'
                value={values.telegramId}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <input
                type='text'
                className='form-control'
                id='validationDefault01'
                placeholder='Twitter ID'
                required
                name='twitterId'
                value={values.twitterId}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <style jsx>{`
                .rmsc .dropdown-container {
                  --rmsc-bg: #f0eded;
                  --rmsc-border: none;
                  --rmsc-p: 10px; /* Spacing */
                  --rmsc-h: 38px; /* Height */
                  --rmsc-main: transparent;
                }
              `}</style>
              <MultiSelect
                className='form-control mb-4'
                id='validationDefault01'
                placeholder='Genre'
                hasSelectAll={false}
                options={genres.map((e) => ({
                  value: e.toUpperCase(),
                  label: e,
                }))}
                value={values.genre.map((e) => ({
                  value: e.toUpperCase(),
                  label: e,
                }))}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    genre: e.map((e) => e.value),
                  }))
                }
                isCreatable
                onCreateOption={(e) => {
                  const option = {
                    value: e.toUpperCase(),
                    label: e,
                  };
                  setGenres((prevGenres) => [...prevGenres, option.value]);
                  return option;
                }}
                disabled={loading}
                labelledBy='Select Genre'
                valueRenderer={(selected) => {
                  if (!selected.length) {
                    return "Select Genres";
                  }

                  return selected.length === 1
                    ? `${selected[0].label}`
                    : selected.map(({ label }) => label).join(", ");
                }}
                ArrowRenderer={() => <ArrowDown height={24} width={24} />}
              />
            </div>

            {/* <input
              type='text'
              className='form-control mb-4'
              id='validationDefault01'
              placeholder='Other Genre (specify)'
              name='otherGenre'
              value={values.otherGenre}
              onChange={handleChange}
              disabled={loading}
            /> */}

            <div className='form-control__select'>
              <select
                className='form-control mb-4'
                id='validationDefault01'
                required
                name='chapterPerVolume'
                value={values.chapterPerVolume}
                onChange={handleChange}
                disabled={loading}>
                <option>How many chapters per volume</option>
                <option value='50'>1 - 50</option>
                <option value='100'>51 - 100</option>
              </select>

              <ArrowDown />
            </div>

            <TermsAndConditions />
          </>
        )}

        <div className='text-center mt-4'>
          <Button
            style={{
              width: "fit-content",
              margin: "0 auto",
              padding: "0 48px",
              borderRadius: 30,
            }}
            isLoading={loading}>
            {othersPage ? "Submit" : "Go"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ArtistForm;
