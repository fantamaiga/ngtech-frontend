'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, Code2, Shield, Smartphone } from 'lucide-react';
import { projectsService } from '@/services/projectsService';
import { Project, ProjectsState } from '@/types';

const ProjectsSection: React.FC = () => {
  const [state, setState] = useState<ProjectsState>(projectsService.initializeState());

  useEffect(() => {
    const loadProjects = async () => {
      setState(projectsService.setLoading([], true));
      try {
        const projects = await projectsService.getProjects();
        setState(projectsService.setSuccess(projects));
      } catch (error) {
        setState(projectsService.setError(error instanceof Error ? error.message : 'Erreur de chargement'));
      }
    };

    loadProjects();
  }, []);

  const getCategoryIcon = (projectType: string) => {
    switch (projectType) {
      case 'MOBILE':
        return <Smartphone className="w-4 h-4" />;
      case 'FULLSTACK':
        return <Code2 className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (projectType: string) => {
    switch (projectType) {
      case 'MOBILE':
        return 'Application Mobile';
      case 'FULLSTACK':
        return 'Application Fullstack';
      default:
        return projectType;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-900 via-teal-900 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text mb-4">
            <Heart className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">Nos Projets</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white drop-shadow-2xl">Impact</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-primary-400 text-transparent bg-clip-text drop-shadow-2xl">Réel</span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-4xl mx-auto leading-relaxed font-medium">
            Découvrez nos réalisations qui allient innovation technologique
            <span className="block mt-2 text-cyan-200">et impact social positif dans les communautés.</span>
          </p>
        </div>

        {/* Loading State */}
        {state.isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#00A9C1] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-cyan-200 font-medium">Chargement des projets...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400/30 rounded-xl p-8 max-w-md text-center">
              <p className="text-red-200 font-bold text-lg mb-4">Erreur de chargement</p>
              <p className="text-red-300">{state.error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!state.isLoading && !state.error && state.projects.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-cyan-200 font-medium text-lg">Aucun projet disponible pour le moment.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!state.isLoading && !state.error && state.projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {state.projects.map((project: Project, index: number) => (
              <div
                key={project.id ?? index}
                className="group bg-gradient-to-br from-cyan-800/30 to-teal-800/30 backdrop-blur-lg rounded-2xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-cyan-700/50 to-teal-700/50 overflow-hidden">
                  {project.coverImageUrl ? (
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_cyan-400_2px,_transparent_2px)] bg-[size:30px_30px] opacity-20 animate-pulse" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Community Badge */}
                  {project.isCommunityProject && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4" />
                      Impact Social
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600/80 to-teal-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                    {getCategoryIcon(project.projectType)}
                    {getCategoryLabel(project.projectType)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-cyan-100 text-sm mb-4 line-clamp-2 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.techStack ?? []).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-cyan-600/30 to-teal-600/30 text-cyan-200 px-3 py-1 rounded-lg text-xs font-medium border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/40"
                      >
                        Voir le projet
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
                      >
                        Code
                      </a>
                    )}
                    {!project.liveUrl && !project.repoUrl && (
                      <button className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                        Voir le projet
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!state.isLoading && !state.error && state.projects.length > 0 && (
          <div className="mt-20 text-center relative z-10">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl px-8 py-4 border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-cyan-100 font-semibold text-lg">Vous avez un projet à impact social ?</span>
              <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/40">
                Démarrons ensemble
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
