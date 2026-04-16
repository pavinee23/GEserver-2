"use client";

import { useDeferredValue, useEffect, useState } from "react";
import {
  languageStorageKey,
  fallbackProfile,
  fallbackServices,
  fallbackClients,
  filterOptions,
  getJson,
} from "@/lib/data";
import { translations } from "@/lib/translations";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ServicesSection from "./ServicesSection";
import ShowcaseSection from "./ShowcaseSection";
import JourneySection from "./JourneySection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function HomeClient() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [services, setServices] = useState(fallbackServices);
  const [clients, setClients] = useState(fallbackClients);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const saved = window.localStorage.getItem(languageStorageKey);
    if (saved && translations[saved]) setCurrentLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [profilePayload, servicesPayload, clientsPayload] = await Promise.all([
          getJson(["/api/backend/profile", "/backend-api/profile"]),
          getJson(["/api/backend/services", "/backend-api/services"]),
          getJson(["/api/backend/clients", "/backend-api/clients"]),
        ]);
        if (!active) return;
        setProfile(profilePayload.profile || fallbackProfile);
        setServices(servicesPayload.services || fallbackServices);
        setClients(clientsPayload.clients || fallbackClients);
      } catch {
        // fallback data already set as initial state
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => { active = false; };
  }, []);

  const ui = translations[currentLanguage] || translations.th;

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredClients = clients.filter((client) => {
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    const haystack = `${client.name} ${client.slug} ${client.description}`.toLowerCase();
    return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  const onlineCount = clients.filter((c) => c.status === "online").length;
  const maintenanceCount = clients.filter((c) => c.status === "maintenance").length;
  const comingSoonCount = clients.filter((c) => c.status === "coming-soon").length;

  const localizedServices = services.map((service) => {
    const copy = ui.serviceMap[service.highlight];
    return copy ? { ...service, ...copy } : service;
  });

  const translatedFilterOptions = filterOptions.map((option) => ({
    ...option,
    label:
      option.key === "all"
        ? ui.filterAll
        : option.key === "online"
          ? ui.filterOnline
          : option.key === "maintenance"
            ? ui.filterMaintenance
            : ui.filterComingSoon,
  }));

  return (
    <main className="agency-page">
      <div className="agency-ambient agency-ambient-a" aria-hidden="true" />
      <div className="agency-ambient agency-ambient-b" aria-hidden="true" />
      <div className="agency-ambient agency-ambient-c" aria-hidden="true" />

      <Navbar
        ui={ui}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        profile={profile}
      />
      <Hero
        ui={ui}
        profile={profile}
        services={localizedServices}
        clients={clients}
        onlineCount={onlineCount}
        maintenanceCount={maintenanceCount}
        comingSoonCount={comingSoonCount}
        loading={loading}
      />
      <ServicesSection ui={ui} services={localizedServices} />
      <ShowcaseSection
        ui={ui}
        filteredClients={filteredClients}
        query={query}
        setQuery={setQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterOptions={translatedFilterOptions}
      />
      <JourneySection ui={ui} />
      <ContactSection ui={ui} profile={profile} />
      <Footer ui={ui} profile={profile} />
    </main>
  );
}
