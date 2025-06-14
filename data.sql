-- Inserir dados na tabela PlanoSaude
INSERT INTO PlanoSaude (nome, limiteCobertura, dataVencimento, operadora, ativo, createdAt, updatedAt) VALUES
('Unimed Essencial', 3500.00, '2025-12-31', 'Central Nacional Unimed', 1, NOW(), NOW()), -- id = 1
('SulAmérica Clássico', 6000.50, '2026-06-30', 'Sul América Seguro Saúde', 1, NOW(), NOW()), -- id = 2
('Bradesco Saúde Top', 10000.00, '2025-11-15', 'Bradesco Seguros', 1, NOW(), NOW()),      -- id = 3
('Amil Fácil', 2000.00, '2026-01-31', 'Amil Assistência Médica', 1, NOW(), NOW()),       -- id = 4
('Hapvida Nosso Plano', 4000.00, '2025-10-30', 'Hapvida Assistência Médica', 1, NOW(), NOW()); -- id = 5

-- Inserir dados na tabela Medico
INSERT INTO Medico (nome, especialidade, crm, createdAt, updatedAt) VALUES
('Dr. Ricardo Alves', 'Cardiologista', 'CRM82380MG', NOW(), NOW()),   -- id = 1
('Dra. Fernanda Lima', 'Dermatologista', 'CRM86495BA', NOW(), NOW()), -- id = 2
('Dr. Paulo Nunes', 'Pediatra', 'CRM31266SC', NOW(), NOW()),         -- id = 3
('Dra. Carla Mendes', 'Ginecologista', 'CRM58866RO', NOW(), NOW()),   -- id = 4
('Dr. Bruno Souza', 'Ortopedista', 'CRM82661MS', NOW(), NOW());      -- id = 5

-- Inserir dados na tabela Paciente (referenciando os IDs dos Planos de Saúde inseridos acima)
INSERT INTO Paciente (nome, endereco, dataNascimento, telefone, planoSaudeId, email, cpf, createdAt, updatedAt) VALUES
('João Silva', 'Rua das Flores, 123', '1980-05-10', '1199999989', 1, 'joao.feral@email.com', '21345687911', NOW(), NOW()), -- planoSaudeId = 1
('Maria Souza', 'Avenida Brasil, 456', '1992-08-25', '2188888788', 2, 'maria.maia@email.com', '97865431309', NOW(), NOW()), -- planoSaudeId = 2
('Carlos Oliveira', 'Travessa da Paz, 789', '1975-11-30', '3187777777', 1, 'carlos.baroco@email.com', '64123198701', NOW(), NOW()), -- planoSaudeId = 1
('Ana Pereira', 'Alameda dos Sonhos, 1011', '2001-03-15', '4136666666', 3, 'ana.maoe@email.com', '01233568890', NOW(), NOW()), -- planoSaudeId = 3
('Lucas Santos', 'Praça da Liberdade, 12', '1988-07-22', '5156555555', 4, 'lucas.pinhos@email.com', '98702345567', NOW(), NOW()); -- planoSaudeId = 4

-- Inserir dados na tabela Consulta (referenciando os IDs de Pacientes e Medicos inseridos acima)
INSERT INTO Consulta (pacienteId, medicoId, data, valor, createdAt, updatedAt) VALUES
(1, 1, '2025-05-15 10:00:00', 150.00, NOW(), NOW()), -- pacienteId = 1, medicoId = 1
(2, 2, '2025-05-16 14:30:00', 200.00, NOW(), NOW()), -- pacienteId = 2, medicoId = 2
(3, 3, '2025-05-17 09:00:00', 180.00, NOW(), NOW()), -- pacienteId = 3, medicoId = 3
(4, 4, '2025-05-18 16:00:00', 220.00, NOW(), NOW()), -- pacienteId = 4, medicoId = 4
(5, 5, '2025-05-19 11:30:00', 160.00, NOW(), NOW()); -- pacienteId = 5, medicoId = 5

-- Inserir dados na tabela Pagamento (referenciando os IDs das Consultas inseridas acima)
INSERT INTO Pagamento (consultaid, valor, dataPagamento, formaPagamento, createdAt, updatedAt) VALUES
(1, 150.00, '2025-05-15 10:15:00', 'Cartão de Crédito', NOW(), NOW()), -- consultaid = 1
(2, 200.00, '2025-05-16 14:45:00', 'Dinheiro', NOW(), NOW()),       -- consultaid = 2
(3, 180.00, '2025-05-17 09:10:00', 'Plano de Saúde', NOW(), NOW()), -- consultaid = 3
(4, 220.00, '2025-05-18 16:15:00', 'Pix', NOW(), NOW()),            -- consultaid = 4
(5, 160.00, '2025-05-19 11:40:00', 'Boleto', NOW(), NOW());         -- consultaid = 5

-- Inserir dados na tabela RelatorioFinanceiro
INSERT INTO RelatorioFinanceiro (dataEmissao, valorTotalConsultas, createdAt, updatedAt) VALUES
('2025-05-15', 150.00, NOW(), NOW()),
('2025-05-16', 200.00, NOW(), NOW()),
('2025-05-17', 180.00, NOW(), NOW()),
('2025-05-18', 220.00, NOW(), NOW()),
('2025-05-19', 160.00, NOW(), NOW());

-- Inserir dados na tabela ReceitaMedica (referenciando os IDs das Consultas e Medicos inseridos acima)
INSERT INTO ReceitaMedica (consultaid, medicoId, descricaoMedicamento, tempoTratamento, dosagem, createdAt, updatedAt) VALUES
(1, 1, 'Paracetamol 500mg', '5 dias', '1 comprimido a cada 6 horas', NOW(), NOW()), -- consultaid = 1, medicoId = 1
(2, 2, 'Creme hidratante', 'uso contínuo', 'aplicar 2 vezes ao dia', NOW(), NOW()),     -- consultaid = 2, medicoId = 2
(3, 3, 'Amoxicilina 500mg', '7 dias', '1 cápsula a cada 8 horas', NOW(), NOW()),     -- consultaid = 3, medicoId = 3
(4, 4, 'Anticoncepcional oral', 'uso contínuo', '1 comprimido ao dia', NOW(), NOW()),  -- consultaid = 4, medicoId = 4
(5, 5, 'Ibuprofeno 600mg', '3 dias', '1 comprimido a cada 8 horas se necessário', NOW(), NOW()); -- consultaid = 5, medicoId = 5
