"use client";
import useFBStore from "@/store/useFbStore";
import FanpageItem from "@/app/components/ui/FanpageItem/FanpageItem";
import type { FanpagesListProps } from "./FanpagesList.props.js";
import type { FBFrom, Page } from "@/interfaces/fb.js";

import s from "./fanpageslist.module.css";
import { JSX, useEffect, useState } from "react";
import { getLeadForms, getLeadsByForm, getPages } from "@/fetch/fb.js";
import { Cookies } from "@/utils/cookies.js";

import Loader from "@/app/components/ui/Loader/Loader";
import RawLeadsSection from "@/app/components/RawLeadsSection/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel/ResultLeadsPanel";
import { fbLeads } from "@/utils/parseLeads.js";
import useErrorStore from "@/store/useErrorStore.js";
import FormList from "@/app/components/FormList/FormList";
import Button from "../ui/Button/Button";

const FanpagesList = ({ ...props }: FanpagesListProps): JSX.Element => {
  const {
    pages,
    setPages,
    setForms,
    setActiveForm,
    forms,
    setLeads,
    setActiveFormId,
    activeFormId,
    activeForm,
    leads,
  } = useFBStore();
  const { addMessage } = useErrorStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [hiddenList, setHiddenList] = useState<boolean>(false);

  const fbPages = async () => {
    const fb_access_token = Cookies.get("fb_access_token");
    const pagesList = await getPages(fb_access_token);
    if (pagesList) {
      setPages(pagesList);
    }
  };

  const showLeadsForm = async (pageId: number, pageAccessToken: string) => {
    const forms = await getLeadForms(pageId, pageAccessToken);
    setActiveForm(pageAccessToken);
    setForms(forms);
    if (!forms.length) {
      addMessage("warning", "На странице нет форм");
    } else {
      setShowForm(true);
      setHiddenList(true);
      setActiveFormId("");
    }
  };

  useEffect(() => {
    fbPages();
  }, []);

  useEffect(() => {
    if (leads.length) {
      setHiddenList(false);
    }
  }, [leads]);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const currentLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const showLead = async (formId: string) => {
    setLoading(true);

    const rawLeads = await getLeadsByForm(formId, activeForm);
    setActiveFormId(formId);

    const leads = fbLeads(rawLeads);

    if (leads.length) {
      addMessage("success", "Данные с формы получены");
      setLeads(leads);
      setLoading(false);
    } else {
      addMessage("error", "Ошибка получения данных");
    }
  };

  return (
    <>
      <Loader isLoading={loading} />

      {!showForm ? (
        <div className={s.cards} {...props}>
          {pages.map((page: Page) => (
            <FanpageItem
              key={page.id}
              text={`${page.category} ${page.name}`}
              click={() => showLeadsForm(page.id, page.access_token)}
            />
          ))}
        </div>
      ) : (
        <>
          {!hiddenList && (
            <Button
              style={{ fontSize: "13px", padding: "4px", marginBottom: "10px" }}
              onClick={() => {
                setHiddenList(true);
                setLeads([]);
                setCurrentPage(1);
              }}
            >
              Back
            </Button>
          )}
          {hiddenList && (
            <Button
              style={{ fontSize: "13px", padding: "4px", marginBottom: "10px" }}
              onClick={() => {
                setForms([]);
                setShowForm(false);
                setCurrentPage(1);
              }}
            >
              Back to FP
            </Button>
          )}

          {hiddenList && (
            <>
              <FormList
                data={forms}
                click={showLead as any}
                renderRow={(form: FBFrom) => (
                  <>
                    <div
                      className={`${s.circle} ${
                        activeFormId === form.id ? s.activeCircle : ""
                      }`}
                    ></div>
                    <div className={s.formName}>{form.name}</div>
                  </>
                )}
              />
            </>
          )}

          {!loading ? (
            <RawLeadsSection
              currentLeads={currentLeads}
              goToPage={goToPage}
              currentPage={currentPage}
              totalPages={totalPages}
              source={"fb"}
            />
          ) : (
            <Loader isLoading={loading} />
          )}

          <ResultLeadsPanel />
        </>
      )}
    </>
  );
};

export default FanpagesList;
